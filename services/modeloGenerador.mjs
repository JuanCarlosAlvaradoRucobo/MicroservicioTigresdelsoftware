import Replicate from 'replicate';

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export const generarTexto = async (prompt) => {
  const input = {
    top_p: 0.9,
    prompt: prompt,
    min_tokens: 0,
    temperature: 0.6,
    presence_penalty: 1.15,
  };

  let generatedText = "";

  for await (const event of replicate.stream("meta/meta-llama-3-8b", { input })) {
    generatedText += event; 
  }

  return generatedText;
};
