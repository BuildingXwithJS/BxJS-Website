import json
import logging

import pandas as pd
from simpletransformers.classification import (ClassificationArgs,
                                               ClassificationModel)

logging.basicConfig(level=logging.INFO)
transformers_logger = logging.getLogger("transformers")
transformers_logger.setLevel(logging.WARNING)

with open('../datasets/twitter/tweets-test-positive.json') as f:
    positiveTestSamples = [json.loads(line)['full_text'].lower() for line in f]

with open('../datasets/twitter/tweets-test-negative.json') as f:
    negativeTestSamples = [json.loads(line)['full_text'].lower() for line in f]

# Create a ClassificationModel
model = ClassificationModel(
    "roberta", "outputs", use_cuda=False
)

# Make predictions with the model
predictions, raw_outputs = model.predict(positiveTestSamples + negativeTestSamples)

print('\n\n\n')
print('predictions:', predictions)
print('raw_outputs:', raw_outputs)
