interface OpenAIMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface OpenAIResponse {
  choices: {
    message: {
      content: string;
    };
  }[];
}

export class OpenAIService {
  private apiKey: string;
  private baseUrl = 'https://api.openai.com/v1';

  constructor() {
    this.apiKey = import.meta.env.VITE_OPENAI_API_KEY;
    if (!this.apiKey) {
      console.warn('OpenAI API key not found. AI features will use fallback responses.');
    }
  }

  async chatCompletion(messages: OpenAIMessage[], model = 'gpt-3.5-turbo'): Promise<string> {
    if (!this.apiKey) {
      throw new Error('OpenAI API key not configured');
    }

    try {
      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model,
          messages,
          max_tokens: 1000,
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`OpenAI API error: ${response.status} - ${errorData.error?.message || 'Unknown error'}`);
      }

      const data: OpenAIResponse = await response.json();
      const content = data.choices[0]?.message?.content || 'Sorry, I could not generate a response.';
      return content;
    } catch (error) {
      console.error('OpenAI API error:', error);
      throw error;
    }
  }

  async generateRoadmap(userData: any): Promise<any> {
    const systemPrompt = `You are an expert career advisor specializing in software engineering internships. Generate a personalized internship preparation roadmap based on the user's profile.

Return ONLY a valid JSON object with this exact structure:
{
  "phases": [
    {
      "id": "phase-1",
      "title": "Phase Title",
      "period": "Time Period",
      "color": "from-blue-500 to-cyan-500",
      "isExpanded": true,
      "tasks": [
        {
          "id": "task-1-1",
          "text": "Task description",
          "completed": false
        }
      ]
    }
  ],
  "resources": [
    {
      "id": "res-1",
      "title": "Resource Title",
      "url": "https://example.com",
      "category": "Category Name",
      "description": "Resource description",
      "isBookmarked": false
    }
  ],
  "badges": [
    {
      "id": "badge-1",
      "title": "Badge Title",
      "description": "Badge description",
      "icon": "Award",
      "earned": false,
      "points": 100
    }
  ]
}

Guidelines:
- Create 4 phases covering foundation, skill development, application season, and backup plans
- Include 8-12 tasks per phase, tailored to the user's experience level and goals
- Generate 15-25 relevant resources across categories: Coding Practice, CS Learning, Career, Internships, etc.
- Create 15-20 achievement badges with appropriate point values (50-500 points)
- Use appropriate Tailwind gradient colors for phases
- Make tasks specific and actionable
- Include resources relevant to their target role and preferred companies`;

    const userPrompt = `User Profile:
- Name: ${userData.name}
- Education: ${userData.educationLevel} in ${userData.major}
- Current Skills: ${userData.currentSkills.join(', ')}
- Target Role: ${userData.targetRole}
- Time Commitment: ${userData.timeCommitment}
- Preferred Companies: ${userData.preferredCompanies.join(', ')}
- Experience Level: ${userData.experience}
- Goals: ${userData.goals.join(', ')}

Generate a comprehensive, personalized roadmap for this student to secure a software engineering internship by Summer 2026.`;

    try {
      const response = await this.chatCompletion([
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ], 'gpt-4');

      // Extract and parse the JSON response
      const roadmapData = this.extractAndParseJSON(response);
      
      // Validate the structure
      if (!roadmapData.phases || !roadmapData.resources || !roadmapData.badges) {
        throw new Error('Invalid roadmap structure received from AI');
      }

      return roadmapData;
    } catch (error) {
      console.error('Error generating AI roadmap:', error);
      throw error;
    }
  }

  private extractAndParseJSON(response: string): any {
    try {
      // First, try to parse the response directly
      return JSON.parse(response);
    } catch (error) {
      // If direct parsing fails, try to extract JSON from markdown code blocks
      const jsonBlockMatch = response.match(/```json\s*([\s\S]*?)\s*```/);
      if (jsonBlockMatch) {
        try {
          return JSON.parse(jsonBlockMatch[1]);
        } catch (blockError) {
          console.warn('Failed to parse JSON from code block:', blockError);
        }
      }

      // If no code block found, try to extract JSON object manually
      const firstBrace = response.indexOf('{');
      const lastBrace = response.lastIndexOf('}');
      
      if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
        const jsonString = response.substring(firstBrace, lastBrace + 1);
        try {
          return JSON.parse(jsonString);
        } catch (extractError) {
          console.warn('Failed to parse extracted JSON:', extractError);
        }
      }

      // If all parsing attempts fail, throw the original error
      throw new Error(`Failed to parse JSON response: ${error}`);
    }
  }
}

export const openaiService = new OpenAIService();