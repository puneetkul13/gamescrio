

const userService = require("../services/user")
const isNumeric = /^\d+$/;
function validateEmail(email) {
    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
exports.getUser = async (req, res) => {
    try{
    console.log(req.query)
    if(req.query.mobileNumber){
        if (!isNumeric.test(req.query.mobileNumber)) {
            return res.status(500).json({ error: "mobile number should only contain digits" });
        } 
        if(req.query.mobileNumber.length!==10){
            return res.status(500).json({ error: "mobile number should be of length 10" });
        }
        
    }
    if(req.query.email){
        if (!validateEmail(req.query.email)) {
            return res.status(500).json({ error: "email is not valid" });
        }
    }

    let res1 = await userService.getUser(req.query)
    return res.status(200).json(res1);
}
    catch(error){
        return res.status(500).json({error: 'error'})
    }
}