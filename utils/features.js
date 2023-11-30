import jwt from "jsonwebtoken";

export const sendCookie = async (user, res, message, statusCode = 200) => {
  try {
    const token = jwt.sign({ _id: user.id }, process.env.JWT_SECRET);

    res
      .status(statusCode)
      .cookie("token", token, {
        maxAge: 365 * 24 * 60 * 60 * 1000,
        sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
        secure: process.env.NODE_ENV === "Development" ? false : true,
      })
      .json({
        success: true,
        message,
      });
  } catch (error) {
    console.error("Error sending cookie:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
