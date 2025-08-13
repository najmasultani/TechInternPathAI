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
    const systemPrompt = `You are an expert career advisor specializing in software engineering internships. Generate a personalized internship preparation roadmap based on the user's profile.

You must act as a detailed internship preparation planner. Create a month-by-month roadmap from the user's start date to their target internship start date.

The roadmap should include specific milestones for:
- Skill development tailored to their current level and target role
- Project building that showcases relevant skills
- Application preparation including resume, portfolio, and LinkedIn optimization
- Interview practice with both technical and behavioral components
              "text": "Specific, actionable task description with deadlines",
- Timeline considerations for exam periods and breaks

Consider their:
- Current technical skill level and known languages/tools
- Target role and preferred companies
- Available time commitment per week
- Existing resume/LinkedIn/portfolio status
- Academic schedule and constraints

Return ONLY a valid JSON object with this exact structure:
          "category": "Category Name (Coding Practice, CS Learning, Career, AI Tools, Hackathons, Job Boards, Internships)",
  "phases": [
    {
      "id": "phase-1",
      "title": "Phase Title",
      "period": "Time Period",
      "color": "from-blue-500 to-cyan-500",
      "isExpanded": true,
      "tasks": [
        {
          "icon": "Award (use: Award, Trophy, Star, Code, Users, Zap, MessageCircle, Send, Building, FileText, Rocket, GitBranch)",
          "title": "Phase Title (e.g., Foundation Building - Month 1-2)",
          "points": 100
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
    - Create 4-6 phases based on the timeline from start date to internship start date
    - Include 8-15 specific, actionable tasks per phase with clear deadlines
    - Tasks should be tailored to their technical level, target role, and available time
    - Generate 20-30 relevant resources across all categories, prioritizing their target role
    - Create 20-25 achievement badges with appropriate point values (25-500 points)
- Use appropriate Tailwind gradient colors for phases
    - Make tasks specific, actionable, and time-bound
    - Include resources relevant to their target role and preferred companies
    - Consider their exam periods and academic schedule
    - Account for their existing skills and what they need to learn
    - Provide month-by-month progression that builds logically`;

    const userPrompt = `User Profile:
- Name: ${userData.name}
- Education: ${userData.educationLevel} in ${userData.major}
- Current Skills: ${userData.currentSkills.join(', ')}
- Target Role: ${userData.targetRole}
- Time Commitment: ${userData.timeCommitment}
- Preferred Companies: ${userData.preferredCompanies.join(', ')}
- Experience Level: ${userData.experience}
- Goals: ${userData.goals.join(', ')}

    Additional Details:
    - Start Date: ${userData.startDate || 'Not specified'}
    - Target Internship Start: ${userData.internshipStartDate || 'Summer 2026'}
    - Technical Level: ${userData.technicalLevel || 'Not specified'}
    - Known Languages/Tools: ${userData.knownLanguages?.join(', ') || 'Not specified'}
    - Specific Role: ${userData.specificRole || userData.targetRole}
    - Target Companies: ${userData.targetCompanies?.join(', ') || userData.preferredCompanies.join(', ')}
    - Weekly Hours Available: ${userData.weeklyHours || userData.timeCommitment}
    - Exam Periods/Breaks: ${userData.examPeriods || 'Not specified'}
    - Has Resume/LinkedIn: ${userData.hasResumeLinkedIn || 'Not specified'}
    - Has Portfolio/GitHub: ${userData.hasPortfolioGitHub || 'Not specified'}

    Generate a comprehensive, month-by-month personalized roadmap from their start date to their target internship start date. 
    Make it highly specific to their current situation, skills, and goals.`;

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