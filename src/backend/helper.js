module.exports = {
    findingJobs: (jobs) => {
        return jobs.filter((item) => {
            return item.deadline <= 128;
        });
    },
    /*
    * compare two data of same list of datasets.
    * check with profit and return the schedule array of data.
    */
    compareProfit: (a, b) => {
        if (a.profit > b.profit) {
            return -1
        }
        if (a.profit < b.profit) {
            return 1
        }
        return 0
    },

    jobSchedulingList: (sortedJobs) => {
        /*
        * Initialize the result sequence as first job in sorted jobs
        */
        const scheduleJobs = []
        //length of the original jobs array.
        const sizeOfJobs = sortedJobs.length
        for (let i = 0; i < sizeOfJobs; i++) {
            for (let j = Math.min(sizeOfJobs, sortedJobs[i].deadline) - 1; j >= 0; j--) {
                if (!scheduleJobs[j]) {
                    scheduleJobs[j] = sortedJobs[i];  // Add this job to result// Make this slot occupied
                    break;
                }
            }
        }
        return scheduleJobs
    },

    findProbability: (ratingOne, ratingSecond) => {
        return 1.0 / (1 + Math.pow(10, (ratingOne - ratingSecond) / 400))
    },

    eloRateTask: (tasks) => {
        /*
       * k is factor that
       * K = γt, where t is ti/48, ti is time and 48 is normalize constant.
       *     γ is choose by running synthetic pr real-life data represent by d
       *  we choose γ value as 1.
       * every sprint is of 7 days i.e. 168 hr
       */
        const k = 168 / 48 //generating custom k factor constant value
        const taskCopy = [...tasks]

        const comparison = (winner, looser) => {
            //expected rating calculation.
            const expectedRatingWinner = winner['relative_weight'] === 1 ? winner['deadline'] * winner['profit'] : winner['relative_weight']
            const expectedRatingLooser = looser['relative_weight'] === 1 ? looser['deadline'] * looser['profit'] : looser['relative_weight']

            //probability to win
            const probabilityLoser = 1.0 / (1 + Math.pow(10, (expectedRatingWinner - expectedRatingLooser) / 400))
            const probabilityWinner = 1.0 / (1 + Math.pow(10, (expectedRatingLooser - expectedRatingWinner) / 400))

            //comparison
            if (probabilityWinner > probabilityLoser) {
                winner["win_count"] = winner["win_count"] + 1
                looser["win_count"] = looser["win_count"] - 1
                winner["relative_weight"] = expectedRatingWinner + k * (1 - probabilityWinner)
                looser["relative_weight"] = expectedRatingLooser + k * (0 - probabilityLoser)
            } else if (probabilityWinner === probabilityLoser) {
                winner["win_count"] = winner["win_count"]
                looser["win_count"] = looser["win_count"]
            } else {
                looser["win_count"] = looser["win_count"] + 1
                winner["win_count"] = winner["win_count"] - 1
                winner["relative_weight"] = expectedRatingWinner + k * (0 - probabilityWinner)
                looser["relative_weight"] = expectedRatingLooser + k * (1 - probabilityLoser)
            }
        }

        for (let i = 0; i < taskCopy.length - 1; i++) {
            for (let j = i + 1; j < taskCopy.length; j++) {
                if(typeof i === undefined){
                    i++
                }
                if(typeof j === undefined){
                    j++
                }
                if(typeof i !== undefined || typeof j !== undefined){
                    comparison(taskCopy[i], taskCopy[j])
                }
            }
        }

        return taskCopy.sort((itemA, itemB) => {return itemB.win_count - itemA.win_count});
    }
}
