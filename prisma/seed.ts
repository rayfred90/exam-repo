import { PrismaClient } from '@prisma/client';
import { arrayToJsonString, objectToJsonString } from '../src/lib/db-utils';

const prisma = new PrismaClient();

async function main() {
  // Create test admin user
  const admin = await prisma.user.create({
    data: {
      email: 'admin@example.com',
      name: 'Admin User',
      role: 'ADMIN',
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
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
