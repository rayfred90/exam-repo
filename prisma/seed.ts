const { PrismaClient } = require('@prisma/client');
const { createHash } = require('crypto');

const prisma = new PrismaClient();

// Simple password hashing function (in a real app, use bcrypt or similar)
function hashPassword(password: string): string {
  return createHash('sha256').update(password).digest('hex');
}

// Helper functions since we can't import from src/lib
function arrayToJsonString(arr: any[]): string {
  return JSON.stringify(arr);
}

function objectToJsonString(obj: any): string {
  return JSON.stringify(obj);
}

async function main() {
  try {
    // Delete existing data
    await prisma.assessmentQuestion.deleteMany();
    await prisma.assessmentAttempt.deleteMany();
    await prisma.assessment.deleteMany();
    await prisma.question.deleteMany();
    await prisma.user.deleteMany();

    // Create admin user
    const admin = await prisma.user.create({
      data: {
        email: 'admin@exam-repoxyz.com',
        name: 'Admin User',
        role: 'ADMIN',
        password: hashPassword('admin@exam-repoxyz'),
      },
    });

    // Create student user
    const student = await prisma.user.create({
      data: {
        email: 'student@exam-repoxyz.com',
        name: 'Student User',
        role: 'STUDENT',
        password: hashPassword('student@exam-repoxyz'),
      },
    });

    // Create test questions
    const question1 = await prisma.question.create({
      data: {
        title: 'Sample Multiple Choice Question',
        type: 'MULTIPLE_CHOICE',
        content: objectToJsonString({
          question: 'What is the capital of France?',
          choices: [
            { id: '1', text: 'London' },
            { id: '2', text: 'Paris' },
            { id: '3', text: 'Berlin' },
            { id: '4', text: 'Madrid' },
          ],
          correctAnswer: '2',
        }),
        points: 1,
        category: 'Geography',
        tags: arrayToJsonString(['basic', 'geography', 'capitals']),
        creatorId: admin.id,
        examType: 'REAL',
      },
    });

    const question2 = await prisma.question.create({
      data: {
        title: 'Sample Drag and Drop Question',
        type: 'DRAG_AND_DROP',
        content: objectToJsonString({
          question: 'Order these planets from closest to farthest from the Sun',
          choices: [
            { id: '1', text: 'Mars' },
            { id: '2', text: 'Venus' },
            { id: '3', text: 'Mercury' },
            { id: '4', text: 'Earth' },
          ],
          correctOrder: ['3', '2', '4', '1'],
        }),
        points: 2,
        category: 'Science',
        tags: arrayToJsonString(['science', 'astronomy', 'solar-system']),
        creatorId: admin.id,
        examType: 'REAL',
      },
    });

    // Create test assessment
    await prisma.assessment.create({
      data: {
        title: 'Sample Quiz',
        description: 'A sample quiz with various question types',
        type: 'PRACTICE',
        duration: 30,
        category: 'General Knowledge',
        tags: arrayToJsonString(['sample', 'practice', 'mixed']),
        settings: objectToJsonString({
          shuffleQuestions: true,
          showFeedback: true,
          passingScore: 70,
        }),
        creatorId: admin.id,
        questions: {
          create: [
            {
              questionId: question1.id,
              order: 0,
              required: true,
            },
            {
              questionId: question2.id,
              order: 1,
              required: true,
            },
          ],
        },
      },
    });

    console.log('Database has been seeded with test data');
    console.log('Created admin user:', admin.email);
    console.log('Created student user:', student.email);
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
