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

  async generateDetailedRoadmap(userData: any): Promise<any> {
    const systemPrompt = `I want you to act as an internship preparation planner. You are an expert career advisor specializing in software engineering internships.

Create a detailed, month-by-month roadmap from the user's start date to their target internship start date.

The roadmap should include specific milestones for:
- Skill development tailored to their current level and target role
- Project building that showcases relevant skills
- Application preparation including resume, portfolio, and LinkedIn optimization
- Interview practice with both technical and behavioral components
- Timeline considerations for exam periods and breaks
- Networking activities and community engagement

All tailored to their specific answers including:
- Start preparation date and target internship start date
- Current technical skill level (Beginner, Intermediate, Advanced)
- Known programming languages and tools
- Target role and specific companies/industries
- Weekly time commitment available
- Exam periods and academic breaks
- Existing resume/LinkedIn/portfolio status

Return ONLY a valid JSON object with this exact structure:
{
  "phases": [
    {
      "id": "phase-1",
      "title": "Month-specific Phase Title (e.g., January 2025 - Foundation Building)",
      "period": "Specific Month Range (e.g., January 2025)",
      "color": "from-blue-500 to-cyan-500",
      "isExpanded": true,
      "tasks": [
        {
          "id": "task-1-1",
          "text": "Specific, actionable task with clear deadline",
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
      "category": "Category Name (Coding Practice, CS Learning, Career, AI Tools, Hackathons, Job Boards, Internships)",
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
- Create phases based on actual months from start date to internship start date
- Each phase should represent 1-2 months of preparation
- Include 8-15 specific, actionable tasks per phase with clear deadlines
- Tasks must be tailored to their technical level, target role, and available weekly hours
- Generate 20-30 relevant resources across all categories, prioritizing their target role
- Create 20-25 achievement badges with appropriate point values (25-500 points)
- Use appropriate Tailwind gradient colors for phases
- Make tasks specific, actionable, and time-bound with actual dates
- Include resources relevant to their target role and preferred companies
- Consider their exam periods and academic schedule in task timing
- Account for their existing skills and what they need to learn
- Provide month-by-month progression that builds logically toward internship readiness
- If they already have resume/LinkedIn, focus on optimization rather than creation
- If they already have portfolio/GitHub, focus on enhancement and new projects
- Adjust difficulty and pace based on available weekly hours`;

    const userPrompt = `User Profile:
Based on the detailed questionnaire responses:

1. Start preparation date: ${userData.startDate || 'Not specified'}
2. Target internship start: ${userData.internshipStartDate || 'Summer 2026'}
3. Current technical skill level: ${userData.technicalLevel || userData.experience || 'Not specified'}
4. Known programming languages/tools: ${userData.knownLanguages?.join(', ') || userData.currentSkills?.join(', ') || 'Not specified'}
5. Target role: ${userData.specificRole || userData.targetRole || 'Not specified'}
6. Target companies/industries: ${userData.targetCompanies?.join(', ') || userData.preferredCompanies?.join(', ') || 'Not specified'}
7. Weekly hours available: ${userData.weeklyHours || userData.timeCommitment || 'Not specified'}
8. Exam periods/breaks: ${userData.examPeriods || 'Not specified'}
9. Has resume and LinkedIn: ${userData.hasResumeLinkedIn || 'Not specified'}
10. Has portfolio/GitHub: ${userData.hasPortfolioGitHub || 'Not specified'}

Additional context:
- Name: ${userData.name || 'Not specified'}
- Education: ${userData.educationLevel || 'Not specified'} in ${userData.major || 'Not specified'}
- Goals: ${userData.goals?.join(', ') || 'Not specified'}

Generate a comprehensive, month-by-month personalized roadmap from their start date to their target internship start date. 
Make it highly specific to their current situation, skills, timeline, and goals. Each month should have clear, actionable tasks with specific deadlines.`;

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
          const sanitizedJson = this.sanitizeJsonString(jsonBlockMatch[1]);
          return JSON.parse(sanitizedJson);
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
          const sanitizedJson = this.sanitizeJsonString(jsonString);
          return JSON.parse(sanitizedJson);
        } catch (extractError) {
          console.warn('Failed to parse extracted JSON:', extractError);
        }
      }

      // If all parsing attempts fail, throw the original error
      throw new Error(`Failed to parse JSON response: ${error}`);
    }
  }

  private sanitizeJsonString(jsonString: string): string {
    // Replace literal newlines and tabs with their escaped JSON equivalents
    return jsonString
      .replace(/\n/g, '\\n')
      .replace(/\t/g, '\\t')
      .replace(/\r/g, '\\r');
  }
}

export const openaiService = new OpenAIService();