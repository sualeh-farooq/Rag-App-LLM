import dotenv from 'dotenv';
dotenv.config();

import { Settings, OpenAI, VectorStoreIndex, SimpleDirectoryReader } from 'llamaindex';
Settings.llm = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY, 
});

const documents = await new SimpleDirectoryReader().loadData({ directoryPath: './data' });

const index = await VectorStoreIndex.fromDocuments(documents);

const queryEngine = index.asQueryEngine();

const response = await queryEngine.query({
    query: `How was Author's camping trip ? `
});

console.log(response.toString());
