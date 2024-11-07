import { handleAPIRoute, withDBTimeout } from '@/lib/api-utils';
import { db } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const revalidate = 0;

type AssessmentType = 'REAL' | 'PRACTICE';

interface AssessmentQuestion {
  question: {
    id: string;
    title: string;
    type: string;
    points: number;
    category: string | null;
  };
  order: number;
  required: boolean;
}

interface AssessmentWithRelations {
  id: string;
  title: string;
  description: string | null;
  type: AssessmentType;
  duration: number;
  category: string | null;
  tags: any;
  settings: any;
  createdAt: Date;
  updatedAt: Date;
  creatorId: string;
  questions: AssessmentQuestion[];
  createdBy: {
    id: string;
    name: string;
    email: string;
  };
  _count: {
    attempts: number;
  };
}

export async function GET(request: NextRequest) {
  try {
    // Get query parameters
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const typeParam = searchParams.get('type');
    const category = searchParams.get('category');
    const search = searchParams.get('search');

    // Calculate pagination
    const skip = (page - 1) * limit;

    // Build filter
    const where = {
      AND: [
        typeParam ? { type: typeParam as AssessmentType } : {},
        category ? { category } : {},
        search ? {
          OR: [
            { title: { contains: search } },
            { description: { contains: search } },
          ],
        } : {},
      ],
    };

    // Fetch data with timeout and handle potential database errors
    const [assessments, total] = await withDBTimeout(async () => {
      try {
        return await Promise.all([
          db.assessment.findMany({
            where,
            skip,
            take: limit,
            include: {
              questions: {
                include: {
                  question: {
                    select: {
                      id: true,
                      title: true,
                      type: true,
                      points: true,
                      category: true,
                    },
                  },
                },
                orderBy: {
                  order: 'asc',
                },
              },
              createdBy: {
                select: {
                  id: true,
                  name: true,
                  email: true,
                },
              },
              _count: {
                select: {
                  attempts: true,
                },
              },
            },
            orderBy: {
              createdAt: 'desc',
            },
          }),
          db.assessment.count({ where }),
        ]);
      } catch (error) {
        console.error('Database query error:', error);
        throw new Error('Failed to fetch assessments');
      }
    }, 10000);

    // Process the assessments
    const processedAssessments = assessments.map((assessment: AssessmentWithRelations) => ({
      ...assessment,
      tags: assessment.tags,
      settings: assessment.settings,
      totalQuestions: assessment.questions.length,
      totalPoints: assessment.questions.reduce((sum: number, q: AssessmentQuestion) => sum + q.question.points, 0),
      averagePoints: Math.round(
        assessment.questions.reduce((sum: number, q: AssessmentQuestion) => sum + q.question.points, 0) / 
        assessment.questions.length || 0
      ),
      totalAttempts: assessment._count.attempts,
    }));

    return NextResponse.json({
      success: true,
      data: {
        assessments: processedAssessments,
        pagination: {
          total,
          pages: Math.ceil(total / limit),
          currentPage: page,
          pageSize: limit,
          hasMore: skip + assessments.length < total,
        },
        meta: {
          totalAssessments: total,
          filteredBy: {
            type: typeParam || 'all',
            category: category || 'all',
            search: search || null,
          },
        },
      },
    }, {
      headers: {
        'Cache-Control': 'no-store',
      },
    });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'An unexpected error occurred',
      },
      { status: 500 }
    );
  }
}

interface CreateAssessmentInput {
  title: string;
  description?: string;
  type: AssessmentType;
  duration?: number;
  category?: string;
  tags?: string[];
  settings?: Record<string, unknown>;
  creatorId: string;
  questions?: Array<{
    id: string;
    required?: boolean;
  }>;
}

export async function POST(request: NextRequest) {
  try {
    const data: CreateAssessmentInput = await request.json();

    // Validate required fields
    if (!data.title || !data.type) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required fields',
        },
        { status: 400 }
      );
    }

    // Create assessment with timeout
    const assessment = await withDBTimeout(async () => {
      try {
        const result = await db.assessment.create({
          data: {
            title: data.title,
            description: data.description,
            type: data.type,
            duration: data.duration || 60,
            category: data.category,
            tags: data.tags || [],
            settings: data.settings || {},
            createdBy: {
              connect: { id: data.creatorId },
            },
            questions: {
              create: (data.questions || []).map((q, index) => ({
                questionId: q.id,
                order: index,
                required: q.required ?? true,
              })),
            },
          },
          include: {
            questions: {
              include: {
                question: true,
              },
            },
            createdBy: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        });

        return {
          ...result,
          tags: result.tags,
          settings: result.settings,
        };
      } catch (error) {
        console.error('Failed to create assessment:', error);
        throw new Error('Failed to create assessment');
      }
    }, 15000);

    return NextResponse.json({
      success: true,
      message: 'Assessment created successfully',
      data: { assessment },
    });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'An unexpected error occurred',
      },
      { status: 500 }
    );
  }
}
