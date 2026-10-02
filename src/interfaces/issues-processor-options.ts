export interface IIssuesProcessorOptions {
  repoToken: string;
  feedbackMessage: string;
  daysBeforeFeedback: number;
  maxDaysOverdue: number;
  exemptDraftPr: boolean;
  exemptLabels: string;
  exemptAuthors: string;
  exemptBots: boolean;
}
