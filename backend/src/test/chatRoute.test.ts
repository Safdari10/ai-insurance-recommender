import request from 'supertest';
import express from 'express';
import { getChat } from '../controllers/chatController';
import { sendMessageToAI } from '../services/geminiService';

jest.mock('../services/geminiService');

const app = express();
app.use(express.json());
app.post('/chat', getChat);

type ChatRouteTestCase = {
    description: string;
    input: { message?: string };
    expectedStatus: number;
    expectedResponse: Record<string, string>;
    mockResponse?: string;
    mockError?: Error;
};

const testCases: ChatRouteTestCase[] = [
    {
        description: 'should return AI response for valid user message',
        input: { message: 'Hi' },
        mockResponse: 'Hello, this is AI!',
        expectedStatus: 200,
        expectedResponse: { response: 'Hello, this is AI!' }
    },
    {
        description: 'should return 400 if message is not provided',
        input: {},
        expectedStatus: 400,
        expectedResponse: { error: 'Message is required.' }
    },
    {
        description: 'should return 500 if there is an error',
        input: { message: 'Hi' },
        mockError: new Error('Test error'),
        expectedStatus: 500,
        expectedResponse: { error: 'An error occurred while getting the chat response.' }
    },
    {
        description: 'should return 400 for empty message',
        input: { message: '' },
        expectedStatus: 400,
        expectedResponse: { error: 'Message is required.' }
    },
    {
        description: 'should return AI response for long message',
        input: { message: 'a'.repeat(1000) },
        mockResponse: 'This is a response to a long message.',
        expectedStatus: 200,
        expectedResponse: { response: 'This is a response to a long message.' }
    },
    {
        description: 'should return AI response for message with special characters',
        input: { message: '!@#$%^&*()_+' },
        mockResponse: 'This is a response to a message with special characters.',
        expectedStatus: 200,
        expectedResponse: { response: 'This is a response to a message with special characters.' }
    }
];

describe('Chat Controller', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    testCases.forEach(({ description, input, mockResponse, mockError, expectedStatus, expectedResponse }) => {
        it(description, async () => {
            if (mockResponse) {
                (sendMessageToAI as jest.Mock).mockResolvedValue(mockResponse);
            }
            if (mockError) {
                (sendMessageToAI as jest.Mock).mockRejectedValue(mockError);
            }

            const response = await request(app)
                .post('/chat')
                .send(input);

            expect(response.status).toBe(expectedStatus);
            expect(response.body).toEqual(expectedResponse);
        });
    });
});
