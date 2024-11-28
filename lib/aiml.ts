import { OpenAI } from 'openai';

if (!process.env.OPENAI_API_KEY) {
  throw new Error('Missing OpenAI API key');
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generatePageContent(
  pageType: string,
  title: string,
  businessInfo: {
    name: string;
    description?: string;
    mission?: string;
    services?: string[];
  }
): Promise<string> {
  try {
    const prompt = getPromptForPageType(pageType, title, businessInfo);

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a professional content writer specializing in childcare and education websites. Create engaging, SEO-friendly content that speaks directly to parents and families."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    const content = completion.choices[0].message.content;
    if (!content) {
      throw new Error('No content generated');
    }

    return content;
  } catch (error: any) {
    console.error('Content Generation Error:', error);
    throw new Error(error.message || 'Failed to generate content');
  }
}

function getPromptForPageType(
  pageType: string,
  title: string,
  businessInfo: {
    name: string;
    description?: string;
    mission?: string;
    services?: string[];
  }
): string {
  const baseInfo = `
Business Name: ${businessInfo.name}
${businessInfo.description ? `Description: ${businessInfo.description}` : ''}
${businessInfo.mission ? `Mission: ${businessInfo.mission}` : ''}
${businessInfo.services ? `Services: ${businessInfo.services.join(', ')}` : ''}
  `.trim();

  switch (pageType) {
    case 'home':
      return `Create a homepage for a childcare center with:
- A compelling hero section
- Unique selling points
- Program overview
- Call-to-action

Business Info:
${baseInfo}
Title: ${title}

Generate the content in HTML format using semantic tags. Include appropriate heading levels, paragraphs, and sections.`;

    case 'about':
      return `Create an "About Us" page for a childcare center:
- Center's history
- Mission and values
- Team highlights
- What makes us unique

Business Info:
${baseInfo}
Title: ${title}

Generate the content in HTML format using semantic tags. Include appropriate heading levels, paragraphs, and sections.`;

    case 'programs':
      return `Create a programs page for a childcare center:
- Educational approach
- Age group details
- Daily schedules
- Learning outcomes

Business Info:
${baseInfo}
Title: ${title}

Generate the content in HTML format using semantic tags. Include appropriate heading levels, paragraphs, and sections.`;

    case 'contact':
      return `Create a contact page for a childcare center:
- Welcoming introduction
- Contact information presentation
- What parents can expect
- Additional ways to connect

Business Info:
${baseInfo}
Title: ${title}

Generate the content in HTML format using semantic tags. Include appropriate heading levels, paragraphs, and sections.`;

    default:
      return `Create professional content for a childcare center's website page:
- Engaging and informative content
- SEO-friendly structure
- Clear value proposition
- Relevant calls to action

Business Info:
${baseInfo}
Title: ${title}

Generate the content in HTML format using semantic tags. Include appropriate heading levels, paragraphs, and sections.`;
  }
}