import {createClient} from '@supabase/supabase-js';
import OpenAI from 'openai';
import env from 'react-dotenv';

//Begining of supabase DB
//Initialize supabase client
const supabaseClient = createClient("https://nazpmeooqnwuurzckrpp.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5henBtZW9vcW53dXVyemNrcnBwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTkzNzk1MDYsImV4cCI6MjAxNDk1NTUwNn0.ZpyNs7_RL4Ou-_y1J_sJLIKJpv6aCr1eD2eXBLVimlc");

//generate embeddings
async function generateEmbeddings(){

  //intialize openai api
  const openai = new OpenAI({
    apiKey: process.env.REACT_APP_AI_KEY,
    dangerouslyAllowBrowser: true
  });

  //create some custom data to be turned into documents(asking questions about marketplace)
  //PDFS, websites, can also be turned into documents that chatbox can read
  const documents= [
    "Jonathan is a senior at Towson University",
    "Jonathan is 21 years old",
    "Jonathan was born in April 2002",
    "Jonathan is studying computer science "
  ];
  
  for(const document of documents){
    const input = document.replace(/\n/g, '');//cleans the string of documents inserted above

    //turn each string(custom data) into an embedding
    const createEmbeddings = await openai.embeddings.create({
      model: "text-embedding-ada-002", //model that creates embeddings
      input
    })
    const[{embedding}]= createEmbeddings.data.data;

    //stores the embedding and the content of strings/text in our supabase db
    await supabaseClient.from('documents').insert({
      content: document,
      embedding
    })
  }

}

generateEmbeddings();


//end of supabase db