export const generateBusinessAnalysisPrompt = (url: string) => `
  Analyze the business based on its website at ${url} and provide a detailed business description in JSON format, including:
  - "overview": An overview of the business
  - "services": Key services or products offered
  - "target_audience": Target audience
  - "unique_selling_points": Unique selling points
  - "market_position": Market position
  - "notable_information": Any notable information that can be gathered from the website
  - "content_topics": List of content topics that could be used in social media posts about the business that will engage/entice the audience - provide 10 topics that could be used by ai to create engaging social media posts.
  - "summary": A summary of the business analysis

  Sample response:
  {
    "overview": "A brief overview of the business",
    "services": ["Service 1", "Service 2", "Service 3"],
    "target_audience": "Description of the target audience",
    "unique_selling_points": ["USP 1", "USP 2", "USP 3"],
    "market_position": "Description of the market position",
    "notable_information": "Any other notable information"
    "summary": "A summary of the business analysis"
    "content_topics": ["Topic 1", "Topic 2", "Topic 3"]
  }
`;
