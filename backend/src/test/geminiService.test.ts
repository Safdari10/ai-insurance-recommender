import { sendMessageToAI } from '../services/geminiService';
import { chatSession } from '../services/geminiModel';

jest.mock('../services/geminiModel');

const mockedSendMessageStream = chatSession.sendMessageStream as jest.Mock;

const mockStream = async function* () {
    yield { text: 'Hello, ' };
    yield { text: 'this is AI!' };
};

describe('sendMessageToAI', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should send a message to the AI and return the streamed response', async () => {
        mockedSendMessageStream.mockResolvedValue(mockStream());

        const response = await sendMessageToAI('Hi');

        expect(mockedSendMessageStream).toHaveBeenCalledWith({
            message: 'Hi',
        });
        expect(response).toBe('Hello, this is AI!');
    });

    it('should throw an error if the AI service fails', async () => {
        mockedSendMessageStream.mockRejectedValue(new Error('Test error'));

        await expect(sendMessageToAI('Hi')).rejects.toThrow(
            'Failed to get a response from the AI.',
        );
    });
});
