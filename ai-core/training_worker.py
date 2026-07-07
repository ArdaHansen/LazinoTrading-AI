"""Phase 1 AI training placeholder.

This file is intentionally simple. Real market datasets, feature engineering,
model training and evaluation belong in later phases.
"""

from dataclasses import dataclass
from datetime import datetime


@dataclass
class TrainingJob:
    dataset_name: str
    strategy_name: str
    status: str = "queued"


def run_training_placeholder(job: TrainingJob) -> dict:
    return {
        "dataset": job.dataset_name,
        "strategy": job.strategy_name,
        "status": "completed_placeholder",
        "created_at": datetime.utcnow().isoformat(),
        "note": "No real model was trained in Phase 1.",
    }


if __name__ == "__main__":
    sample_job = TrainingJob(dataset_name="demo_market_data", strategy_name="moving_average_alpha")
    print(run_training_placeholder(sample_job))
