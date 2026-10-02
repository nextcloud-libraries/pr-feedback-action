import * as core from '@actions/core';
import {IssuesProcessor} from './classes/issues-processor';
import {IIssuesProcessorOptions} from './interfaces/issues-processor-options';

async function _run(): Promise<void> {
  try {
    const args = _getAndValidateArgs();

    const issueProcessor: IssuesProcessor = new IssuesProcessor(args);
    await issueProcessor.processIssues();
  } catch (error) {
    core.error(error);
    core.setFailed(error.message);
  }
}

function _getAndValidateArgs(): IIssuesProcessorOptions {
  const args: IIssuesProcessorOptions = {
    repoToken: core.getInput('repo-token'),
    feedbackMessage: core.getInput('feedback-message'),
    daysBeforeFeedback: parseFloat(
      core.getInput('days-before-feedback', {required: true})
    ),
    maxDaysOverdue: parseFloat(
      core.getInput('max-days-overdue', {required: true})
    ),
    exemptDraftPr: core.getInput('exempt-draft-pr') === 'true',
    exemptLabels: core.getInput('exempt-labels'),
    exemptAuthors: core.getInput('exempt-authors'),
    exemptBots: core.getInput('exempt-bots') === 'true'
  };

  for (const numberInput of ['days-before-feedback', 'max-days-overdue']) {
    if (isNaN(parseFloat(core.getInput(numberInput)))) {
      const errorMessage = `Option "${numberInput}" did not parse to a valid float`;
      core.setFailed(errorMessage);
      throw new Error(errorMessage);
    }
  }

  return args;
}

void _run();
