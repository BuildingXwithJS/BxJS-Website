import json
import logging

import pandas as pd
from simpletransformers.classification import (ClassificationArgs,
                                               ClassificationModel)

logging.basicConfig(level=logging.INFO)
transformers_logger = logging.getLogger("transformers")
transformers_logger.setLevel(logging.WARNING)

with open('../datasets/twitter/tweets-positive.json') as f:
    positiveExamples = [json.loads(line)['full_text'].lower() for line in f]

with open('../datasets/twitter/tweets-negative.json') as f:
    negativeExamples = [json.loads(line)['full_text'].lower() for line in f]

with open('../datasets/twitter/tweets-test-positive.json') as f:
    positiveTestSamples = [json.loads(line)['full_text'].lower() for line in f]

with open('../datasets/twitter/tweets-test-negative.json') as f:
    negativeTestSamples = [json.loads(line)['full_text'].lower() for line in f]

# Preparing train data
train_data = [[item, 1] for item in positiveExamples] + [[item, 0]
                                                         for item in negativeExamples]
train_df = pd.DataFrame(train_data)
train_df.columns = ["text", "labels"]

# Preparing eval data
eval_data = [[item, 1] for item in positiveTestSamples] + [[item, 0]
                                                           for item in negativeTestSamples]
eval_df = pd.DataFrame(eval_data)
eval_df.columns = ["text", "labels"]

# Optional model configuration
model_args = ClassificationArgs(num_train_epochs=5, overwrite_output_dir=True)

# Create a ClassificationModel
model = ClassificationModel(
    "roberta", "roberta-base", args=model_args, use_cuda=False
)

# Train the model
model.train_model(train_df)

# Evaluate the model
result, model_outputs, wrong_predictions = model.eval_model(eval_df)

print('\n\n\n')
print('result:', result)
print('model_outputs:', model_outputs)
print('wrong_predictions:', wrong_predictions)
print('\n\n\n')

# Make predictions with the model
# predictions, raw_outputs = model.predict(["Sam was a Wizard"])

# print('\n\n\n')
# print('predictions:', predictions)
# print('raw_outputs:', raw_outputs)
