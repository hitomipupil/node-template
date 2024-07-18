import bcryptjs from "bcryptjs";

const matchPasswords = (password, hashedPassword) => {
return bcryptjs.compareSync(password, hashedPassword)
};

export default matchPasswords;
