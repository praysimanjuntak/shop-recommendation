const axios = require('axios');

const handleRecommendation = async (req, res) => {
    const { text } = req.body;
    try {
        axios.post("https://de0ar61vma.execute-api.ap-southeast-1.amazonaws.com/inference", {
            text
        })
        .then(response => res.json(response.data))
        .catch(console.log)
    } catch {
        console.log("error")
    }
}

module.exports = {handleRecommendation}