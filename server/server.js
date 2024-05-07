const express = require("express");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
require("dotenv").config();
const exerciseData = require("./api/exercise_data_en.json");
const {
  registerUser,
  registerUserData,
  getUserData,
  registerUserGoogle,
  checkUser,
  getUserWeightHeight,
  getUserMacros,
  getPrevUserData,
  setUserData,
  registerUserDataPulse,
  registerUserDataWeight,
  registerUserDataWater,
  resetProgress,
  getUserInfo,
  addNewFood,
  searchOwnFood,
  updateUsername,
  updateMail,
  updateWeight,
  updateHeight,
  updateAge,
  deleteFood,
  updateCal,
  updateGender,
  updatePass,
  updatePfp,
  getHistory
} = require("./api/db.mongo");
const { getUser } = require("./api/db.mongo");
const jsonData = require("./api/foodData.json");
const path = require("path");
const NodeCache = require("node-cache");
const bcrypt = require("bcrypt");
const cache = new NodeCache();
const jwt = require("jsonwebtoken");
const { error } = require("console");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/callback",
    },
    async function (accessToken, refreshToken, profile, cb) {
      try {
        let user = getUser(profile.id);

        if (!user) {
          user = await registerUserGoogle(
            profile.id,
            profile.displayName,
            profile.emails[0].value
          );
        }

        return cb(null, user);
      } catch (err) {
        return cb(err);
      }
    }
  )
);

const generateAccessToken = (userId) => {
  console.log("Generating access token for user " + userId);
  const accessToken = jwt.sign({ userId }, "_N0C0mpaRt1r", { expiresIn: "4h" });
  return accessToken;
};

function getRandomExercises(exercises, count) {
  const shuffledExercises = exercises.sort(() => Math.random() - 0.5);
  return shuffledExercises.slice(0, count);
}

async function fetchFood(query, user) {
  try {
    const searchQueryNormalized = query.trim().toLowerCase();
    const searchWords = searchQueryNormalized.split(/\s+/);
    let ownFood = null;
    const foundItems = [];

    if (user) {
      ownFood = await searchOwnFood(user, query);
      if (ownFood) {
        foundItems.push(...ownFood);
      }
    }

    for (const category of jsonData) {
      for (const item of category.items) {
        if (
          searchWords.some(
            (searchWord) =>
              item.name.toLowerCase().startsWith(searchWord) &&
              !foundItems.some((foundItem) => foundItem.name === item.name)
          )
        ) {
          foundItems.push(item);
        }
      }
    }

    return Promise.resolve({ items: foundItems });
  } catch (error) {
    console.error("Error al buscar alimentos:", error.message);
    return Promise.reject(error);
  }
}


const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return passport.authenticate("google", { session: false })(req, res, next);
  }
  const token = authHeader.split(" ")[1];
  if (token === null || authHeader === "") {
    console.error("Error validating token:", error.message);
    return res.status(401).json({ success: false, message: "Invalid token" });
  }

  try {
    const decoded = jwt.verify(token, "_N0C0mpaRt1r");
    req.user = decoded.userId;
    next();
  } catch (error) {
    console.error("Error validating token:", error.message);
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
};

function decodeToken(token) {
  try {
    const decoded = jwt.verify(token, '_N0C0mpaRt1r');
    return decoded;
  } catch (error) {
    console.error('Error decoding token:', error.message);
    return null;
  }
}

app.use("/gifs", express.static(path.join(__dirname, "gifs")));

app.get("/api/exercises", (req, res) => {
  const { search, bodyPart, perPage, page, filter } = req.query;
  const cacheKey = JSON.stringify(req.query);

  const cachedData = cache.get(cacheKey);
  if (cachedData) {
    return res.json(cachedData);
  }

  let filteredExercises = exerciseData;

  if (search) {
    filteredExercises = filteredExercises.filter((exercise) =>
      exercise.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  if (bodyPart) {
    filteredExercises = filteredExercises.filter(
      (exercise) => exercise.bodyPart.toLowerCase() === bodyPart.toLowerCase()
    );
  }

  if (filter && filter.length > 0) {
    filteredExercises = filteredExercises.filter((exercise) =>
      filter.includes(exercise.bodyPart.toLowerCase())
    );
    filteredExercises.sort((a, b) => {
      if (a.bodyPart.toLowerCase() < b.bodyPart.toLowerCase()) {
        return -1;
      }
      if (a.bodyPart.toLowerCase() > b.bodyPart.toLowerCase()) {
        return 1;
      }
      return 0;
    });
  }

  if (!page) {
    let samples = {};
    const uniqueBodyParts = [
      ...new Set(filteredExercises.map((exercise) => exercise.bodyPart)),
    ];
    uniqueBodyParts.forEach((bodyPart) => {
      const exercisesForBodyPart = filteredExercises.filter(
        (exercise) => exercise.bodyPart === bodyPart
      );
      samples[bodyPart] = getRandomExercises(exercisesForBodyPart, 5);
    });

    const data = { samples };
    return res.json(data);
  }

  const perPage_fix =
    perPage && perPage > 0 && perPage < 100 ? parseInt(perPage) : 10;
  const currentPage = page && page > 0 ? parseInt(page) : 1;
  const startIndex = (currentPage - 1) * perPage;
  const endIndex = currentPage * perPage;

  const results = filteredExercises.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredExercises.length / perPage_fix);
  const data = { results, totalPages };
  cache.set(cacheKey, data, 5 * 60);
  res.json(data);
});

app.get("/api/food/", async (req, res) => {
  const { search } = req.query;
  let token = req.headers.authorization;
  if (token) req.headers.authorization.split(' ')[1];
  console.log(token);
  let result;
  try {
    let userId = decodeToken(token);
    if (userId) userId = userId.userId;
    result = await fetchFood(search, userId);
    return res.json(result);
  } catch (error) {
    console.error("Error al buscar alimentos:", error.message);
    return res.status(500).json({ error: "Error al buscar alimentos" });
  }
});

app.post("/api/food/delete", async (req, res) => {
  const { search } = req.query;
  const { nombre, tipo } = req.body;

  let token = req.headers.authorization;
  if (token){
    token = req.headers.authorization.split(' ')[1];
  }

  let result;
  try {
    let userId = decodeToken(token);
    if (userId) userId = userId.userId;
    
    result = await deleteFood(userId, nombre, tipo);
    return res.json(result);
  } catch (error) {
    console.error("Error al buscar alimentos:", error.message);
    return res.status(500).json({ error: "Error al buscar alimentos" });
  }
});

app.post("/auth/login", async (req, res) => {
  const { signInUsername, signInPassword } = req.body;
  try {
    const findQuery = signInUsername;
    const userquery = await getUser(findQuery);
    if (!userquery) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid username or password" });
    }

    const passwordMatch = await bcrypt.compare(
      signInPassword,
      userquery.password
    );

    if (!passwordMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid username or password" });
    }
    const token = generateAccessToken(signInUsername);
    resetProgress(signInUsername);
    return res.status(200).json({ success: true, token });
  } catch (error) {
    console.error("Error occurred while authenticating user:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
});

app.post("/auth/register", async (req, res) => {
  const { formData } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(formData.userData.password, 10);
    formData.userData.password = hashedPassword;
    delete formData.userData.password_dup;
    const result = await registerUser(formData);
    const token = generateAccessToken(formData.userData.username);
    return res.status(200).json({ success: true, token });
  } catch (error) {
    console.error("Error occurred while registering user:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
});

app.post("/auth/check", async (req, res) => {
  const { username, email } = req.body;
  try {
    const result = await checkUser(username, email);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error occurred while checking user:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

app.get("/user/data", verifyToken, async (req, res) => {
  const userId = req.user;
  console.log(userId);
  try {
    const userData = await getUserData(userId);
    res.status(200).json(userData);
  } catch (error) {
    console.error("Error al obtener los datos del usuario:", error);
    res.status(500).json({ error: "Error al obtener los datos del usuario" });
  }
});

app.post("/user/data", verifyToken, async (req, res) => {
  const { userId, objectiveData } = req.body;
  try {
    const insertedId = await registerUserData(userId, objectiveData);
    res
      .status(200)
      .json({ message: "User data registered successfully", insertedId });
  } catch (error) {
    console.error("Error registering user data:", error);
    res.status(500).json({ error: "Error registering user data" });
  }
});

app.post("/user/data/pulse", verifyToken, async (req, res) => {
  const user = req.user;
  const { pulseDate, pulse } = req.body;
  try {
    const insertedId = await registerUserDataPulse(pulseDate, pulse, user);
    res.status(200).json({ message: "User pulse registered successfully" });
  } catch (error) {
    console.error("Error registering user data:", error);
    res.status(500).json({ error: "Error registering user data" });
  }
});

app.post("/user/data/weight", verifyToken, async (req, res) => {
  const user = req.user;
  const { weightDate, weight } = req.body;

  try {
    const insertedId = await registerUserDataWeight(weightDate, weight, user);
    res.status(200).json({ message: "User weight registered successfully" });
  } catch (error) {
    console.error("Error registering user data:", error);
    res.status(500).json({ error: "Error registering user data" });
  }
});
app.post("/user/data/water", verifyToken, async (req, res) => {
  const user = req.user;
  const { waterAmount } = req.body;

  try {
    const insertedId = await registerUserDataWater(waterAmount, user);
    res.status(200).json({ message: "User weight registered successfully" });
  } catch (error) {
    console.error("Error registering user data:", error);
    res.status(500).json({ error: "Error registering user data" });
  }
});

app.get("/user/data/food", verifyToken, async (req, res) => {
  const userId = req.user;
  try {
    const userData = await getUserData(userId);
    res.status(200).json(userData.objectiveData.foodRecords);
  } catch (error) {
    console.error("Error al obtener los datos del user:", error);
    res.status(500).json({ error: "Error al obtener los datos del user" });
  }
});

app.post("/user/data/food", verifyToken, async (req, res) => {
  const userId = req.user;
  const { food } = req.body;

  try {
    const userData = await setUserData(userId, food);
    res.status(200).json(userData.foodRecords);
  } catch (error) {
    console.error("Error al obtaining the users data:", error);
    res.status(500).json({ error: "Error al obtaining the users data" });
  }
});

app.post("/user/data/add-food", verifyToken, async (req, res) => {
  const userId = req.user;
  const { foodData } = req.body;

  try {
    const userData = await addNewFood(userId, foodData);
    res.status(200).json("ok");
  } catch (error) {
    console.error("Error al obtaining the users data:", error);
    res.status(500).json({ error: "Error al obtaining the users data" });
  }
});

app.post("/verify-token", verifyToken, async (req, res) => {
  try {
    res.status(200).json({ message: "Token válido" });
  } catch (error) {
    console.error("Error al obtaining the users data:", error);
    res.status(500).json({ error: "Error al obtaining the users data" });
  }
});

app.get("/user/data/weightHeight", verifyToken, async (req, res) => {
  const username = req.user;
  try {
    const userData = await getUserWeightHeight(username);
    if (!userData) {
      return res.status(404).json({ error: "No user records found" });
    }
    const { weight, height } = userData;
    res.status(200).json({ weight, height });
  } catch (error) {
    console.error("Error while getting the user data:", error);
    res
      .status(500)
      .json({ error: "Error while getting the user weight or height" });
  }
});

app.get("/user/data/macros", verifyToken, async (req, res) => {
  const username = req.user;
  try {
    const userData = await getUserMacros(username);
    if (!userData) {
      return res.status(404).json({ error: "No user records found" });
    }
    const { weight, height, age, gender, activityLevel, fitnessGoal } =
      userData;
    res
      .status(200)
      .json({ weight, height, age, gender, activityLevel, fitnessGoal });
  } catch (error) {
    console.error("Error while getting the user data:", error);
    res.status(500).json({ error: "Error while getting the user macros" });
  }
});

app.post("/user/data/update/token", async (req, res) => {
  const { formDataUpdate } = req.body;
  try {
    const token = generateAccessToken(formDataUpdate.userData.username);
    return res.status(200).json({ success: true, token });
  } catch (error) {
    console.error("Could not update the users token");
    res
      .status(500)
      .json({ error: "An error ocurred while updating the users token" });
  }
});

app.get("/user/data/info", verifyToken, async (req, res) => {
  const user = req.user;
  try {
    const userInfo = await getUserInfo(user);
    if (!userInfo) {
      return res.status(401).json({ success: false, message: "No user found" });
    }
    console.log("Obtained the data from the user succesfully");
    return res.status(200).json(userInfo);
  } catch (error) {
    console.error("The users data could not be found: ", error);
    res.status(500).json({ error: "An error ocurred while getting the users data"});
  }
});

app.post("/user/data/update/info/username", verifyToken, async (req, res) => {
  const user = req.user;
  const { formDataUpdate } = req.body;
  try{
    const prevData = await getPrevUserData(user);
    const update = await updateUsername(user, formDataUpdate.userData.username);
    if (!update || !prevData){
      return res.status(401).json({ success: false, message: "No user found" });
    }

    if (prevData.username === formDataUpdate.userData.username){
      return res.status(401).json({ success: false, message: "The new username can't be the same as the previous one" });
    }

    console.log("Updated the username");
    return res.status(200).json({success: true, message: "Update sucessfull"});
  }
  catch (error){
    res.status(500).json({ error: "An error ocurred while getting the users data"});
  }
});

app.post("/user/data/update/info/email", verifyToken, async (req, res) => {
    const user = req.user;
    const { formDataUpdate } = req.body;
    try{
      const prevData = await getPrevUserData(user);
      const update = await updateMail(user, formDataUpdate.userData.email);
      if (!update || !prevData){
        return res.status(401).json({ success: false, message: "No user found" });
      }

      if (prevData.email === formDataUpdate.userData.email){
        return res.status(401).json({ success: false, message: "The new email can't be the same as the previous one" });
      }

      console.log("Updated the email");
      return res.status(200).json({success: true, message: "Update sucessfull"});
    }
    catch (error){
      res.status(500).json({ error: "An error ocurred while getting the users data"});
    }
});

app.post("/user/data/update/info/weight", verifyToken, async (req, res) => {
  const user = req.user;
  const { formDataUpdate } = req.body;
  try{
    const update = await updateWeight(user, formDataUpdate.userData.weight);
    if (!update){
      return res.status(401).json({ success: false, message: "No user found" });
    }

    console.log("Updated the weight");
    return res.status(200).json({success: true, message: "Update sucessfull"});
  }
  catch (error){
    res.status(500).json({ error: "An error ocurred while getting the users data"});
  }
});

app.post("/user/data/update/info/height", verifyToken, async (req, res) => {
  const user = req.user;
  const { formDataUpdate } = req.body;
  try{
    const update = await updateHeight(user, formDataUpdate.userData.height);
    if (!update){
      return res.status(401).json({ success: false, message: "No user found" });
    }

    console.log("Updated the height");
    return res.status(200).json({success: true, message: "Update sucessfull"});
  }
  catch (error){
    res.status(500).json({ error: "An error ocurred while getting the users data"});
  }
});

app.post("/user/data/update/info/age", verifyToken, async (req, res) => {
  const user = req.user;
  const { formDataUpdate } = req.body;
  try{
    const update = await updateAge(user, formDataUpdate.userData.age);
    if (!update){
      return res.status(401).json({ success: false, message: "No user found" });
    }

    console.log("Updated the age");
    return res.status(200).json({success: true, message: "Update sucessfull"});
  }
  catch (error){
    res.status(500).json({ error: "An error ocurred while getting the users data"});
  }
});

app.post("/user/data/update/info/cal", verifyToken, async (req, res) => {
  const user = req.user;
  const { formDataUpdate } = req.body;
  try{
    const update = await updateCal(user, formDataUpdate.userData.kcalGoal);
    if (!update){
      return res.status(401).json({ success: false, message: "No user found" });
    }

    console.log("Updated the Kcal");
    return res.status(200).json({success: true, message: "Update sucessfull"});
  }
  catch (error){
    res.status(500).json({ error: "An error ocurred while getting the users data"});
  }
});

app.post("/user/data/update/info/gender", verifyToken, async (req, res) => {
  const user = req.user;
  const { formDataUpdate } = req.body;
  try{
    const update = await updateGender(user, formDataUpdate.userData.gender);
    if (!update){
      return res.status(401).json({ success: false, message: "No user found" });
    }

    console.log("Updated the gender");
    return res.status(200).json({success: true, message: "Update sucessfull"});
  }
  catch (error){
    res.status(500).json({ error: "An error ocurred while getting the users data"});
  }
});


app.post("/user/data/update/info/pass", verifyToken, async (req, res) => {
  const user = req.user;
  const { formData } = req.body;

  try{
    const prevUser = await getPrevUserData(user);

    const passwordCompare = await bcrypt.compare(
      formData.userData.passwordIn,
      prevUser.password,
    );


    if (passwordCompare){
      return res.status(401).json({ success: false, message: "The new password cannot be the same as the previous one" });
    }

    if ( formData.userData.passwordIn !== formData.userData.passwordRepeat){
      return res.status(401).json({ success: false, message: "The passwords should match" });
    }

    const encryptedPassword = await bcrypt.hash(formData.userData.passwordIn, 10);
    const update = await updatePass(user, encryptedPassword); 
       

    if (!prevUser || !update){
      return res.status(401).json({ success: false, message: "No user found" });
    }

    console.log("Updated the password");
    return res.status(200).json({success: true, message: "Update sucessfull"});
  }
  catch (error){
    res.status(500).json({ error: "An error ocurred while getting the users data"});
  }
});

app.post("/user/data/pfp", verifyToken, async (req, res) => {
  const user = req.user;
  const {formDataUpdate} = req.body;

  try{
    const update = await updatePfp(user, formDataUpdate.userData.pfp);
    if (!update){
      return res.status(401).json({ success: false, message: "No user found" });
    }
    
    console.log("Users profile picture updated");
    return res.status(200).json({success: true, message: "Update sucessfull"});
  }
  catch (error){
    res.status(500).json({ error: "An error ocurred while updating the users profile picture"});
  }
});

app.get("/user/data/history", verifyToken, async (req, res) => {
  const user = req.user;
  try {
    const userData = await getHistory(user);
    res.status(200).json(userData);
  } catch (error) {
    console.error("Error al obtener los datos del usuario:", error);
    res.status(500).json({ error: "Error al obtener los datos del usuario" });
  }
});


app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  function (req, res) {
    res.redirect("/");
  }
);

app
  .route("/auth/google/callback")
  .get(
    passport.authenticate("google", { failureRedirect: "/login" }),
    function (req, res) {
      res.redirect("/create");
    }
  );

app
  .route("create")
  .get(function (req, res) {})
  .post(function (req, res) {});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
