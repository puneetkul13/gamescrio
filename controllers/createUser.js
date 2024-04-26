
const userService = require("../services/user")
const isNumeric = /^\d+$/;
function validateEmail(email) {
    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

exports.createUser = async (req, res) => {
    try{
    let {name, mobileNumber, email, userId} = req.body
    
    if(!userId){
        return res.status(500).json({ error: "userId is mandatory" });
    }
    if(!name){
        return res.status(500).json({ error: "name is mandatory" });
    }
    if(!email){
        return res.status(500).json({ error: "email is mandatory" });
    }
    if(!mobileNumber){
        return res.status(500).json({ error: "mobileNumber is mandatory" });
    }
    if (!isNumeric.test(mobileNumber)) {
        return res.status(500).json({ error: "mobile number should only contain digits" });
    } 
    if(mobileNumber.length!==10){
        return res.status(500).json({ error: "mobile number should be of length 10" });
    }
    if (!validateEmail(email)) {
        return res.status(500).json({ error: "email is not valid" });
    }
    let res1 = await userService.createUser(name, mobileNumber, email, userId)
    return res.status(200).json(res1);}
    catch(error){
        return res.status(500).json({error: 'error'})
    }
}
