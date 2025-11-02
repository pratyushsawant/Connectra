import mongoose from "mongoose";
import {DB_NAME} from "../constants.js"
const mongoURI = process.env.MONGO_URI;

const connectToMongo = async ()=>{
   try {
      // Add connection timeout
      const connectionOptions = {
         serverSelectionTimeoutMS: 5000, // 5 second timeout
         socketTimeoutMS: 45000,
      };
      
      const connectionInstance = await mongoose.connect(`${mongoURI}/${DB_NAME}`, connectionOptions);
      console.log(`✅ Connected to MongoDB! HOST: ${connectionInstance.connection.host}`);
      return connectionInstance;
   } catch (error) {
      console.error("❌ Error connecting to MongoDB:", error.message);
      console.error("\n💡 Make sure MongoDB is running:");
      console.error("   - Install MongoDB: brew install mongodb-community");
      console.error("   - Start MongoDB: brew services start mongodb-community");
      console.error("   - Or use MongoDB Atlas (cloud) and update MONGO_URI in .env\n");
      process.exit(1);
   }
}

export default connectToMongo