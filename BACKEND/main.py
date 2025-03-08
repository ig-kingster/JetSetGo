from fastapi import FastAPI, HTTPException, File, UploadFile,Form,Request
from pydantic import BaseModel
from motor.motor_asyncio import AsyncIOMotorClient
from contextlib import asynccontextmanager
from fastapi.middleware.cors import CORSMiddleware
import os
import aiofiles
from fastapi.staticfiles import StaticFiles
from passlib.context import CryptContext 
import logging
from bson import ObjectId



MONGO_URI = ""

DATABASE_NAME = "db_jetsetgo"


logging.basicConfig(level=logging.ERROR, format="%(asctime)s - %(levelname)s - %(message)s")
logger = logging.getLogger(__name__)


UPLOAD_DIR = "uploads"  # Directory to save uploaded files

# # Password hashing setup
# pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# # Utility function to hash passwords
# def hash_password(password: str) -> str:
#     return pwd_context.hash(password)

# # Utility function to verify passwords
# def verify_password(plain_password: str, hashed_password: str) -> bool:
#     return pwd_context.verify(plain_password, hashed_password)



# Utility function to save the file
async def save_file(file: UploadFile, upload_dir: str) -> str:
    os.makedirs(upload_dir, exist_ok=True)
    file_path = os.path.join(upload_dir, file.filename)
    async with aiofiles.open(file_path, "wb") as out_file:
        while content := await file.read(1024):
            await out_file.write(content)
    return file_path





# FastAPI app
@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup logic
    mongo_client = AsyncIOMotorClient(MONGO_URI)
    db = mongo_client[DATABASE_NAME]
    app.state.db = db  # Attach the database to app.state
    print("Connected to MongoDB")
    yield
    # Shutdown logic
    await mongo_client.close()
    print("MongoDB connection closed")

app = FastAPI(lifespan=lifespan)


app.mount("/uploads", StaticFiles(directory=UPLOAD_DIR), name="uploads")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Admin(BaseModel):
    admin_name : str
    admin_photo : str
    admin_email : str
    admin_password  : str

   
@app.post("/admin/")
async def create_admin(admin:Admin):
    admin_data = admin.model_dump()
    result = await app.state.db["tbl_admin"].insert_one(admin_data)
    return{"id": str(result.inserted_id),"message": "admin added sucessfully"}


class State(BaseModel):
    state_name : str
   
@app.post("/state")
async def create_state(state:State):
    state_data = state.model_dump()
    result = await app.state.db["state"].insert_one(state_data)
    return{"id": str(result.inserted_id),"message": "state added sucessfully"}


@app.get("/state")
async def read_state():
    cursor = app.state.db["state"].find()
    stateData = await cursor.to_list(length=None)  # Convert cursor to list
    for state in stateData:
        state["_id"] = str(state["_id"])
    if not stateData:
        raise HTTPException(status_code=404, detail="Item not found")
    return stateData


class District(BaseModel):
   district_name : str
   state_id : str

@app.post("/district")
async def create_district(district:District):
    district_data =district.model_dump()
    result = await app.state.db["district"].insert_one(district_data)
    return{"id": str(result.inserted_id),"message": "district added sucessfully"}

@app.get("/district")
async def read_district():
    cursor = app.state.db["district"].find()
    districtData = await cursor.to_list(length=None)  # Convert cursor to list 
    for district in districtData:
        district["_id"] = str(district["_id"])
    if not districtData:
        raise HTTPException(status_code=404, detail="Item not found")
    return districtData



class Place(BaseModel):
    place_name : str
    district_id: str

@app.post("/place/")
async def create_place(place:Place):
    place_data = place.model_dump()
    result = await app.state.db["place"].insert_one(place_data)
    return{"id": str(result.inserted_id),"message": "place added sucessfully"}


class Hotel(BaseModel):
    hotel_name  : str
    hotel_email : str
    hotel_address  : str
    hotel_phone_no : int
    place_id  : str
    hotel_proof : str
    hotel_photo : str
    hotel_status : str
    hotel_room_count : int
    hotel_password : str


   
@app.post("/hotel/")
async def create_hotel(hotel:Hotel):
    hotel_data = hotel.model_dump()
    result = await app.state.db["tbl_hotel"].insert_one(hotel_data)
    return{"id": str(result.inserted_id),"message": "hotel added sucessfully"}


# class User(BaseModel):
#     user_email : str
#     user_password : str
#     registration_date: str 



 
# @app.post('/user')
# async def create_user(user:User):
#     user_data = user.model_dump()
#     result = await app.state.db["user"].insert_one(user_data)
#     return{"id": str(result.inserted_id),"message": "user added sucessfully"}



class User(BaseModel):
    user_email: str
    user_password: str
    registration_date: str  # Should be in ISO format

@app.post('/user')
async def create_user(user: User):
    user_data = user.model_dump()



    # Insert into MongoDB
    result = await app.state.db["user"].insert_one(user_data)

    return {
        "id": str(result.inserted_id),
        "registration_year": user_data["registration_year"],  # ✅ Now included
        "message": "User added successfully"
    }


@app.get("/userslist")
async def get_all_usersData():
    cursor = app.state.db["user"].find()  # No await here
    userData = await cursor.to_list(length=None)  # Await only for to_list()
    
    for user in userData:
        user["_id"] = str(user["_id"])  # Convert ObjectId to string
    
    return userData

class Guide(BaseModel):
    guide_name : str
    guide_email : str
    guide_phone_number : int
    guide_proof : str
    guide_photo : str
    guide_status : str
    guide_password : str
    hotel_id : str



 
@app.post("/guide/")
async def create_guide(guide:Guide):
    guide_data = guide.model_dump()
    result = await app.state.db["guide"].insert_one(guide_data)
    return{"id": str(result.inserted_id),"message": "guide added sucessfully"}


class Packagehead(BaseModel):
    packagehead_days : str
    packagehead_price : int
    packagehead_details : str
    packagehead_status : str
    packagehead_count : str
    packagehead_room_count : str



@app.post("/packagehead/")
async def create_packagehead(packagehead:Packagehead):
    packagehead_data = packagehead.model_dump()
    result = await app.state.db["packagehead"].insert_one(packagehead_data)
    return{"id": str(result.inserted_id),"message": "packagehead added sucessfully"}



class Packagebody(BaseModel):
    packagebody_details : str
    place_id : str
    packagehead_id : str


@app.post("/packagebody/")
async def create_packagebody(packagebody:Packagebody):
    packagebody_data = packagebody.model_dump()
    result = await app.state.db["packagebody"].insert_one(packagebody_data)
    return{"id": str(result.inserted_id),"message": "packagebody added sucessfully"}


class Gallery(BaseModel):
    packagebody_id : str
    gallery_file : str
    gallery_description : str



@app.post("/gallery/")
async def create_gallery(gallery:Gallery):
    gallery_data = gallery.model_dump()
    result = await app.state.db["gallery"].insert_one(gallery_data)
    return{"id": str(result.inserted_id),"message": "gallery added sucessfully"}


class Booking(BaseModel):
    booking_date : str
    booking_for_date : str
    booking_status : str
    booking_to_date : str
    packagehead_id : str
    user_id : str
    booking_status : str
    guide_id : str
    booking_amount : int


@app.post("/booking/")
async def create_booking(booking:Booking):
    booking_data = booking.model_dump()
    result = await app.state.db["booking"].insert_one(booking_data)
    return{"id": str(result.inserted_id),"message": "booking added sucessfully"}


class Userinfo(BaseModel):
    userinfo_name : str
    userinfo_number : int
    booking_id : str



@app.post("/userinfo/")
async def create_userinfo(userinfo:Userinfo):
    userinfo_data = userinfo.model_dump()
    result = await app.state.db["userinfo"].insert_one(userinfo_data)
    return{"id": str(result.inserted_id),"message": "userinfo added sucessfully"}


class Rating(BaseModel):
    user_id : str
    guide_id : str
    hotel_id : str
    rating_contact : int
    rating_count : int


@app.post("/rating/")
async def create_rating(rating:Rating):
    rating_data = rating.model_dump()
    result = await app.state.db["rating"].insert_one(rating_data)
    return{"id": str(result.inserted_id),"message": "rating added sucessfully"}



class Complaint(BaseModel):
    complaint_title : str
    complaint_contact : str
    complaint_reply : str
    complaint_status : str
    user_id : str


@app.post("/complaint/")
async def create_complaint(complaint:Complaint):
    complaint_data = complaint.model_dump()
    result = await app.state.db["complaint"].insert_one(complaint_data)
    return{"id": str(result.inserted_id),"message": "complaint added sucessfully"}







@app.post("/fileUp/")
async def create_user(
    photo: UploadFile = File(...),
):
    try:
        # Save the file
        saved_filename = await save_file(photo, UPLOAD_DIR)
        file_url = f"http://127.0.0.1:8000/{saved_filename}"

        # Insert data into MongoDB
        user_data = { "photo": file_url}
        result = await app.state.db["photoUpload"].insert_one(user_data)

        return {
            "id": str(result.inserted_id),
            "message": "User created successfully",
            "file_path": file_url,
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to create user: {str(e)}")

# class Login(BaseModel):
#     User_email : str
#     User_password : str

# @app.post('/login')
# async def read_user(user: Login):
#     userData = await app.state.db["user"].find_one({"email": user.User_email, "password": user.User_password})

#     if userData:
#         return { 'id': str(userData['_id']), 'message': 'login successful','login':'User'}
   
#     else:
#         return { 'message': 'Invalid credentials' }

class Login(BaseModel):
    user_email: str  # Lowercase to match MongoDB field
    user_password: str

@app.post('/login')
async def read_user(user: Login):
    userData = await app.state.db["user"].find_one({"user_email": user.user_email, "user_password": user.user_password})
    hotelData = await app.state.db["hotel"].find_one({"hotel_email": user.user_email, "hotel_password": user.user_password})

    if userData:
        return { 'id': str(userData['_id']),
                'email':str(userData['user_email']), 
                'message': 'Login successful', 
                'login': 'User'}
    elif hotelData:
        return { 'id': str(hotelData['_id']),
                'email':str(hotelData['hotel_email']), 
                'message': 'Login successful', 
                'login': 'Hotel',
                'status':str(hotelData['hotel_status'])
                }
    else:
        raise HTTPException(status_code=401, detail="Invalid credentials")


@app.post("/updateprofile/{uid}")
async def updateuser(uid: str,
    profileImage: UploadFile = File(...)
):
    try:
        saved_filename = await save_file(profileImage, UPLOAD_DIR)
        file_url = f"http://127.0.0.1:8000/{saved_filename}"
        user_data = { "user_photo": file_url}
        result = await app.state.db["user"].update_one({"_id": ObjectId(uid)}, {"$set": user_data})
        return {
          "id": str(uid),
          "message": "User created successfully",
          "file_path": user_data.get("user_photo"),
           }
    except Exception as e:
        logger.error(f"Error occurred while creating user: {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail=f"Failed to create user: {str(e)}")
       
        
        
    

@app.post("/editUser/{uid}")
async def edit_user(uid: str,
    name: str = Form(...),
    # email: str = Form(...),
    phone: str = Form(...),
    address: str = Form(...),
    place: str = Form(...),
    # npswd: str = Form(...),
    # photo: UploadFile = File(...),
    idproof: UploadFile = File(...)
):
    try:
        # Save the file
        # saved_filename = await save_file(photo, UPLOAD_DIR)
        # file_url = f"http://127.0.0.1:8000/{saved_filename}"
        
        saved_id = await save_file(idproof, UPLOAD_DIR)
        id_url = f"http://127.0.0.1:8000/{saved_id}"

        # Hash the password
        # hashed_password = hash_password(npswd)
        # Insert data into MongoDB
        # user_data = {"user_name": name,"user_address": address, "user_email": email, "user_password": hashed_password, "user_photo": file_url,"user_phone":phone,"place_id":place,"user_proof":id_url}
        
        user_data = {"user_name": name,"user_address": address, "user_proof":id_url,"user_phone":phone,"place_id":place}
        # result = await app.state.db["user"].insert_one(user_data)
        result = await app.state.db["user"].update_one({"_id": ObjectId(uid)}, {"$set": user_data})
        
    #     return {
    #         "id": str(result.inserted_id),
    #         "message": "User created successfully",
    #         "file_path": file_url,
    #         "file_path2": id_url
            
    #     }
    # except Exception as e:
    #     raise HTTPException(status_code=500, detail=f"Failed to create user: {str(e)}")

        return {
            "id": str(uid),
            "message": "User created successfully",
            # "file_path": user_data.get("user_photo"),
            "file_path2": user_data.get("user_proof"),
        }
    except Exception as e:
        logger.error(f"Error occurred while creating user: {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail=f"Failed to create user: {str(e)}")
    

@app.get("/district/{state_id}")
async def read_district(state_id: str):
    cursor = app.state.db["district"].find({"state_id": state_id})   
    DistrictData = await cursor.to_list(length=None)
    for district in DistrictData:
        district["_id"] = str(district["_id"])
        if not district:
            raise HTTPException(status_code=404, detail="Item not found")
    return DistrictData

@app.get("/place/{district_id}")
async def read_place(district_id: str):
    cursor = app.state.db["place"].find({"district_id": district_id})   
    PlaceData = await cursor.to_list(length=None)
    for place in PlaceData:
        place["_id"] = str(place["_id"])
        if not place:
            raise HTTPException(status_code=404, detail="Item not found")
    return PlaceData

# @app.get("/userdetails/{uid}")
# async def read_user(uid: str):
#     cursor = app.state.db["user"].find({"_id": uid})   
#     UserData = await cursor.to_list(length=None)
#     for user in UserData:
#         user["_id"] = str(user["_id"])
#         if not user:
#             raise HTTPException(status_code=404, detail="Item not found")
#     return UserData

# @app.get("/userdetails/{uid}")
# async def read_user(uid: str):

#     try:
#         user = await app.state.db["user"].find_one({"_id": ObjectId(uid)})  # Convert uid to ObjectId
#     except:
#         raise HTTPException(status_code=400, detail="Invalid UID format")

#     if not user:
#         raise HTTPException(status_code=404, detail="User not found")
#     if user["place_id"]:
#         user["_id"] = str(user["_id"])  # Convert _id to string
#         place_id = user["place_id"]
#         place = await app.state.db["place"].find_one({"_id": ObjectId(place_id)})  # Convert uid to ObjectId
#         place_name = place["place_name"]
#         district_id = place["district_id"]
#         user["place_name"] = place_name
    
   
#     if user["district_id"]:
#         district_id = user["district_id"]
#         district = await app.state.db["district"].find_one({"_id": ObjectId(district_id)})  # Convert uid to ObjectId
#         district_name = district["district_name"]
#         state_id = district["state_id"]
        
#         user["district_name"] = district_name
#     if user["state_id"]:  
#         state_id = user["state_id"]
#         state = await app.state.db["state"].find_one({"_id": ObjectId(state_id)})  # Convert uid to ObjectId
#         state_name = state["state_name"]
#         user["state_name"] = state_name
        
#     return user




@app.get("/userdetails/{uid}")
async def read_user(uid: str):
    try:
        user = await app.state.db["user"].find_one({"_id": ObjectId(uid)})
        if not user:
            raise HTTPException(status_code=404, detail="User not found")

        user["_id"] = str(user["_id"])  # Convert _id to string

        # Fetch place details if available
        place_id = user.get("place_id")
        if place_id:
            place = await app.state.db["place"].find_one({"_id": ObjectId(place_id)})
            if place:
                user["place_name"] = place.get("place_name", "")
                district_id = place["district_id"]

#         # Fetch district details if available
#         district_id = user.get("district_id")
        if district_id:
            district = await app.state.db["district"].find_one({"_id": ObjectId(district_id)})
            if district:
                user["district_name"] = district.get("district_name", "")
                state_id=district["state_id"]
#         # Fetch state details if available
#         state_id = user.get("state_id")
        if state_id:
            state = await app.state.db["state"].find_one({"_id": ObjectId(state_id)})
            if state:
                user["state_name"] = state.get("state_name", "")

        return user
    except Exception as e:
        raise HTTPException(status_code=400, detail="Invalid UID format or database error")



@app.post('/updatepassword/{uid}')
async def change_password(
    uid: str,
    newpassword: str = Form(...),
    currentpassword: str = Form(...)
):
    try:
        user = await app.state.db["user"].find_one({"_id": ObjectId(uid)})


        if not user:
            raise HTTPException(status_code=404, detail="User not found")

        # Validate the current password
        if user["user_password"] != currentpassword:
            raise HTTPException(status_code=401, detail="Invalid current password")

        # Update password securely
        await app.state.db["user"].update_one(
            {"_id": ObjectId(uid)},
            {"$set": {"user_password": newpassword}}
        )

        return {"message": "Password updated successfully"}

    except Exception as e:
        logger.error(f"Error occurred while updating password: {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail=f"Failed to update password: {str(e)}")
    
    
    

@app.get("/username/{uid}")
async def read_user(uid: str):
    try:
        user = await app.state.db["user"].find_one({"_id": ObjectId(uid)})
        if not user:
            raise HTTPException(status_code=404, detail="User not found")

        user["_id"] = str(user["_id"])  # Convert _id to string
        return {"user_name": user.get("user_name", "")}

    except Exception as e:
        raise HTTPException(status_code=400, detail="Invalid UID format or database error")

 

@app.get("/useremail/{uid}")
async def read_user(uid: str):
    try:
        user = await app.state.db["user"].find_one({"_id": ObjectId(uid)})
        
        if not user:
            raise HTTPException(status_code=404, detail="User not found")

        user["_id"] = str(user["_id"]),
        return {"user_email": user.get("user_email", "")}
    except Exception as e:
        raise HTTPException(status_code=400, detail="Invalid UID format or database error")

@app.get("/hotelemail/{hid}")
async def read_hotel(hid: str):
    try:
        hotel = await app.state.db["hotel"].find_one({"_id": ObjectId(hid)})
        
        if not hotel:
            raise HTTPException(status_code=404, detail="hotel not found")

        hotel["_id"] = str(hotel["_id"]),
        return {"hotel_email": hotel.get("hotel_email", "")}
    except Exception as e:
        raise HTTPException(status_code=400, detail="Invalid UID format or database error")







@app.post("/hotelreg")
async def reg_hotel(
    name: str = Form(...),
    email: str = Form(...),
    # phone: str = Form(...),
    address: str = Form(...),
    place: str = Form(...),
    password: str = Form(...),
    photo: UploadFile = File(...),
    idproof: UploadFile = File(...)
):
    try:
        # Save the file
        saved_filename = await save_file(photo, UPLOAD_DIR)
        file_url = f"http://127.0.0.1:8000/{saved_filename}"
        
        saved_id = await save_file(idproof, UPLOAD_DIR)
        id_url = f"http://127.0.0.1:8000/{saved_id}"

        # Hash the password
        # hashed_password = hash_password(npswd)
        # Insert data into MongoDB
        # user_data = {"user_name": name,"user_address": address, "user_email": email, "user_password": hashed_password, "user_photo": file_url,"user_phone":phone,"place_id":place,"user_proof":id_url}
        
        hotel_data = {"hotel_name": name,"hotel_address": address,"hotel_email":email, "hotel_proof":id_url,"place_id":place,"hotel_password":password,"hotel_status":"pending","hotel_photo":file_url}
        result = await app.state.db["hotel"].insert_one(hotel_data)
        # result = await app.state.db["user"].update_one({"_id": ObjectId(uid)}, {"$set": user_data})
        
    #     return {
    #         "id": str(result.inserted_id),
    #         "message": "User created successfully",
    #         "file_path": file_url,
    #         "file_path2": id_url
            
    #     }
    # except Exception as e:
    #     raise HTTPException(status_code=500, detail=f"Failed to create user: {str(e)}")

        return {
         
            "message": "User created successfully",
            "file_path": hotel_data.get("hotel_photo"),
            "file_path2": hotel_data.get("hotel_proof"),
        }
    except Exception as e:
        logger.error(f"Error occurred while creating user: {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail=f"Failed to create user: {str(e)}")
    
    
    
    
    
    
    
    
    
# @app.post("/packageadd/{hid}")
# async def add_package(
#     hid: str,
#     packageImage: UploadFile = File(...),
#     packageName: str = Form(...),
#     packageDescription: str = Form(...),
#     duration: str = Form(...),
#     packagePrice: str = Form(...)
# ):
   
#         saved_filename = await save_file(packageImage, UPLOAD_DIR)
#         file_url = f"http://127.0.0.1:8000/{saved_filename}"

#     # Save Package to MongoDB
#     # package_data = {"hotel_id":hid ,package_name": packageName,"package_description": packageDescription,"package_duration": duration,"package_price": packagePrice,"package_Image": file_url } # Store path to retrieve later
#         package_data = {
#         "hotel_id": hid,
#         "package_name": packageName,
#         "package_description": packageDescription,
#         "package_duration": duration,
#         "package_price": packagePrice,
#         "package_image": file_url,  # Store path for retrieval
#     }
    
#     result = await app.state.db["package"].insert_one(package_data)
# return {"message": "Package added successfully", "package_id": str(result.inserted_id)}


# @app.post("/packagehead/{hid}")
# async def add_package(
#     hid: str,
#     # packageImage: UploadFile = File(...),
#     # packageName: str = Form(...),
#     # packageDescription: str = Form(...),
#     # duration: str = Form(...),
#     # packagePrice: str = Form(...)
#        packagehead_name: str=Form(...),

#                 packagehead_days:  str=Form(...),
#                 packagehead_price:  str=Form(...),
#                 packagehead_details: str=Form(...),
#                 packagehead_status:  str=Form(...),
#                 packagehead_count: str=Form(...),
#                 packagehead_room_count:  str=Form(...)
# ):
#     # Save the uploaded image
#     # saved_filename = await save_file(packageImage, UPLOAD_DIR)
#     # file_url = f"http://127.0.0.1:8000/{saved_filename}"

#     # Save Package to MongoDB
#     package_data = {
#         "hotel_id": hid,
#         "packagehead_name": packagehead_name,
#         "packagehead_days": packagehead_days,
#         "packagehead_details": packagehead_details,
#         "packagehead_status": packagehead_status,
#         "packagehead_count": packagehead_count,
#         "packagehead_room_count": packagehead_room_count,
#         "packagehead_price":packagehead_price
        
        
#         # "package_image": file_url,  # Store path for retrieval
        
#     }

#     # result = await package_collection.insert_one(package_data)
#     result = await app.state.db["packagehead"].insert_one(package_data)
    
#     return {"message": "Package added successfully", "package_id": str(result.inserted_id)}



 

# @app.get("/packages/{hid}")
# async def read_package(hid: str):
#     try:
#         # package = await app.state.db["package"].find_one({"hotel_id": hid})
#         package = await app.state.db["package"].find({"hotel_id": hid}).to_list(100)  

#         if not package:
#             raise HTTPException(status_code=404, detail="Package not found")

#         # package["_id"] = str(package["_id"])  # Remove the comma

#         for package in package:
#             package["_id"] = str(package["_id"])  # Convert ObjectId to string

#         return package
#     except Exception:
#         raise HTTPException(status_code=400, detail="Invalid UID format or database error")


# @app.get("/packages/{hid}")
# async def read_packages_by_hid(hid: str):
#     try:
#         packages = await app.state.db["packagehead"].find({"hotel_id": hid}).to_list(100)

#         if not packages:
#             raise HTTPException(status_code=404, detail=f"No packages found for hotel ID {hid}")

#         # Convert ObjectId to string
#         for packagehead in packages:
#             packagehead["_id"] = str(packagehead["_id"])

#         return packages
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")
    
@app.get("/packages/{hid}")
async def read_packages_by_hotel_id(hid: str):
    try:
        # Fetch all packagehead details for the given hotel_id
        package_heads = await app.state.db["packagehead"].find({"hotel_id": hid}).to_list(100)

        if not package_heads:
            raise HTTPException(status_code=404, detail=f"No packages found for hotel ID {hid}")

        result = []

        for package_head in package_heads:
            package_head_id = str(package_head["_id"])

            # Fetch all packagebody entries related to this packagehead
            package_bodies = await app.state.db["packagebody"].find({"packagehead_id": package_head_id}).to_list(100)

            package_body_details = []

            for package_body in package_bodies:
                packagebody_id = str(package_body["_id"])
                place_id = package_body.get("place_id")

                # Fetch place details if place_id exists
                place_details = None
                if place_id:
                    place = await app.state.db["place"].find_one({"_id": ObjectId(place_id)})
                    place_details = {
                        "place_id": str(place["_id"]),
                        "place_name": place.get("place_name", ""),
                        "place_description": place.get("place_description", "")
                    } if place else None

                # Fetch gallery images related to this packagebody
                gallery_images = []
                async for img in app.state.db["gallery"].find({"packagebody_id": packagebody_id}):
                    gallery_images.append({
                        "gallery_file": img["gallery_file"],
                        "gallery_description": img.get("gallery_description", "")
                    })

                package_body_details.append({
                    "packagebody_id": packagebody_id,
                    "packagebody_details": package_body.get("packagebody_details", ""),
                    "place": place_details,
                    "gallery": gallery_images  # Images related to this packagebody
                })

            # Append packagehead with its multiple packagebodies
            result.append({
                "_id": package_head_id,
                "hotel_id": package_head.get("hotel_id", ""),
                "packagehead_name": package_head.get("packagehead_name", ""),
                "packagehead_days": package_head.get("packagehead_days", 0),
                "packagehead_price": package_head.get("packagehead_price", 0),
                "packagehead_details": package_head.get("packagehead_details", ""),
                "packagehead_status": package_head.get("packagehead_status", ""),
                "packagehead_count": package_head.get("packagehead_count", 0),
                "packagehead_room_count": package_head.get("packagehead_room_count", 0),
                "package_bodies": package_body_details  # Multiple packagebody entries
            })

        return result

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")      
    
# @app.delete("/deletepkg/{package_id}")
# async def delete_item(packagehead_id: str):
#     result = await app.state.db["packagehead"].delete_one({"_id": ObjectId(packagehead_id)})
#     if result.deleted_count == 0:
#         raise HTTPException(status_code=404, detail="Item not found")
#     return {"message": "Item deleted successfully"}



# @app.get("/packagelist/")
# async def read_packages():
#     try:
#         packages = await app.state.db["packagehead"].find().to_list(100)

#         if not packages:
#             raise HTTPException(status_code=404, detail=f"No packages found ")

#         # Convert ObjectId to string
#         for package in packages:
#             package["_id"] = str(package["_id"])

#         return packages
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")
    




@app.post("/cotravellers/{uid}")
async def add_cotraveller(
    uid: str,
    number: str = Form(...),
    name: str = Form(...),
    
):
   

    # Save Package to MongoDB
    cotraveller = {
        "user_id": uid,
        "cotraveller_name": name,
        "cotraveller_number": number,
    }

    # result = await package_collection.insert_one(package_data)
    result = await app.state.db["cotraveller"].insert_one(cotraveller)
    
    return {"message": "Companion added successfully", "cotraveller_id": str(result.inserted_id)}




@app.get("/cotravellerslist/{uid}")
async def read_cotravellers(uid: str):
    try:
        cotravellers = await app.state.db["cotraveller"].find({"user_id": uid}).to_list(100)

        if not cotravellers:
            raise HTTPException(status_code=404, detail=f"No packages found ")

        # Convert ObjectId to string
        for cotraveller in cotravellers:
            cotraveller["_id"] = str(cotraveller["_id"])

        return cotravellers
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")
    
    
    
        
@app.delete("/cotravellersdelete/{id}")
async def delete_item(id: str):
    result = await app.state.db["cotraveller"].delete_one({"_id": ObjectId(id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Item not found")
    return {"message": "Item deleted successfully"}




@app.get("/pending")
async def pending():
    try:
        pending = await app.state.db["hotel"].find({"hotel_status": "pending"}).to_list(100)

        if not pending:
            raise HTTPException(status_code=404, detail=f"No packages found ")

        # Convert ObjectId to string
        for hotel in pending:
            hotel["_id"] = str(hotel["_id"])

        return hotel
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")
    
    
    
    
    
    
@app.post('/status/{action}/{hotel_id}')
async def change_password(
    hotel_id: str,
    action:str,
):
    try:
        hotel = await app.state.db["hotel"].find_one({"_id": ObjectId(hotel_id)})


        if not hotel:
            raise HTTPException(status_code=404, detail="User not found")

        # Validate the current password
        if hotel:

        # Update password securely
             await app.state.db["hotel"].update_one(
            {"_id": ObjectId(hotel_id)},
            {"$set": {"hotel_status": action}}
        )

        return {"message": " updated successfully"}

    except Exception as e:
        logger.error(f"Error occurred while updating : {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail=f"Failed to update : {str(e)}")
    
    
    
@app.get("/hoteldetails/{hid}")
async def read_hotel(hid: str):
    try:
        hotel = await app.state.db["hotel"].find_one({"_id": ObjectId(hid)})
        
        if not hotel:
            raise HTTPException(status_code=404, detail="hotel not found")

        hotel["_id"] = str(hotel["_id"])
        return hotel
    except Exception as e:
        raise HTTPException(status_code=400, detail="Invalid UID format or database error")
    
    
    
    
    

@app.post("/updatehotel/{hid}")
async def update_hotel(
    hid: str,
    name: str ,
    address:str,
    room: str
):

    # Save Package to MongoDB
    hotel_data = {
        "hotel_id": hid,
        "hotel_name": name,
        "hotel_address": address,
        "hotel_room_count": room,
    }

    # result = await package_collection.insert_one(package_data)
    result = await app.state.db["hotel"].update_one({"_id": ObjectId(hid)}, {"$set": hotel_data})
    
    return {"message": "profile updated successfully", "_id": str(result.inserted_id)}


# Get Places
@app.get("/placesadd")
async def get_places():
    places = await app.state.db["place"].find().to_list(100)
    for place in places:
        place["_id"] = str(place["_id"])
    return places



# @app.get("/placesadd")
# async def read_place():
#     cursor = app.state.db["place"].find()
#     placeData = await cursor.to_list(length=None)  # Convert cursor to list
#     for place in placeData:
#         place["_id"] = str(place["_id"])
#     if not placeData:
#         raise HTTPException(status_code=404, detail="Item not found")
#     return placeData


# @app.post("/packagebody")
# async def add_package_body(
#     packagebody_details: str = Form(...),
#     place_id: str = Form(...),
#     packagehead_id: str = Form(...)
# ):
#     # Check if Package Head exists
#     print(await app.state.db["packagehead"].find_one({"_id": ObjectId(packagehead_id)}))

#     package_head = await app.state.db["packagehead"].find_one({"_id": ObjectId(packagehead_id)})
#     if not package_head:
#         raise HTTPException(status_code=404, detail="Package Head not found")

#     package_body = {
#         "packagebody_details": packagebody_details,
#         "place_id": place_id,
#         "packagehead_id": packagehead_id,
#     }
#     result = await app.state.db["packagebody"].insert_one(package_body)
#     return {"packagebody_id": str(result.inserted_id)}











# Create Package Head
@app.post("/packagehead/{hid}")
async def create_package_head(hid: str, 
                              packagehead_name: str = Form(...), 
                              packagehead_days: int = Form(...),
                              packagehead_price: float = Form(...),
                              packagehead_details: str = Form(...),
                              packagehead_status: str = Form(...),
                              packagehead_count: int = Form(...),
                              packagehead_room_count: int = Form(...)):
    package_head = {
        "hotel_id": hid,
        "packagehead_name": packagehead_name,
        "packagehead_days": packagehead_days,
        "packagehead_price": packagehead_price,
        "packagehead_details": packagehead_details,
        "packagehead_status": packagehead_status,
        "packagehead_count": packagehead_count,
        "packagehead_room_count": packagehead_room_count
    }
    result =  await app.state.db["packagehead"].insert_one(package_head)
    return {"packagehead_id": str(result.inserted_id)}

# Create Package Body
@app.post("/packagebody")
async def create_package_body(packagebody_details: str = Form(...),
                              place_id: str = Form(...),
                              packagehead_id: str = Form(...)):
    
    package_body = {
        "packagebody_details": packagebody_details,
        "place_id": place_id,
        "packagehead_id": packagehead_id
    }
    print(package_body)
    result =  await app.state.db["packagebody"].insert_one(package_body)
    return {"packagebody_id": str(result.inserted_id)}

# @app.get("/packagebodies/{packagehead_id}")
# async def get_package_bodies(packagehead_id: str):
#     package_bodies = await app.state.db["packagebody"].find({"packagehead_id": packagehead_id}).to_list(None)
    
#     for body in package_bodies:
#         body["_id"] = str(body["_id"])
        
#         # Ensure place exists before accessing its _id
#         if "place" in body and isinstance(body["place"], dict) and "_id" in body["place"]:
#             body["place"]["_id"] = str(body["place"]["_id"])

#     return package_bodies

from bson import ObjectId

@app.get("/packagebodies/{packagehead_id}")
async def get_package_bodies(packagehead_id: str):
    package_bodies = await app.state.db["packagebody"].find({"packagehead_id": packagehead_id}).to_list(None)

    for body in package_bodies:
        body["_id"] = str(body["_id"])
        body["place_id"] = str(body["place_id"])  # Ensure it's a string

        # Fetch place details from place collection
        place = await app.state.db["place"].find_one({"_id": ObjectId(body["place_id"])})
        if place:
            body["place"] = {"_id": str(place["_id"]), "place_name": place["place_name"]}
        else:
            body["place"] = None  # If place not found, set to None

    return package_bodies


# Upload Gallery
@app.post("/gallery")
async def upload_gallery(gallery_file: UploadFile = File(...),
                         gallery_description: str = Form(...),
                         packagebody_id: str = Form(...)):
    
    #   Save the uploaded image
    saved_filename = await save_file(gallery_file, UPLOAD_DIR)
    file_url = f"http://127.0.0.1:8000/{saved_filename}"
    
    gallery_entry = {
        "gallery_file": file_url,
        "gallery_description": gallery_description,
        "packagebody_id": packagebody_id
    }
    await app.state.db["gallery"].insert_one(gallery_entry)
    return {"message": "Gallery data added successfully"}



# # Update package
# @app.put("/package/{package_id}")
# def update_package(package_id: str, packagehead: Packagehead):
#     result = app.state.db["packagehead"].update_one({"_id": ObjectId(package_id)}, {"$set": packagehead.dict()})
#     if result.modified_count == 0:
#         raise HTTPException(status_code=404, detail="Package not found")
#     return {"message": "Package updated successfully"}
@app.post("/package/status/{package_id}")
def update_package_status(package_id: str, status: dict):
    if not ObjectId.is_valid(package_id):  # Validate ObjectId
        raise HTTPException(status_code=400, detail="Invalid package ID")

    result = app.state.db["packagehead"].update_one(
        {"_id": ObjectId(package_id)}, 
        {"$set": {"packagehead_status": status["status"]}}
    )
    
    if result.matched_count == 0:  # Check if package exists
        raise HTTPException(status_code=404, detail="Package not found")

    return {"message": "Status updated successfully"}
# Delete package
@app.delete("/package/{package_id}")
def delete_package(package_id: str):
    result = app.state.db["packagehead"].delete_one({"_id": ObjectId(package_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Package not found")
    return {"message": "Package deleted successfully"}


@app.get("/packagelist/")
async def read_packages():
    try:
        # Fetch all packagehead details
        packages = await app.state.db["packagehead"].find().to_list(100)

        if not packages:
            raise HTTPException(status_code=404, detail="No packages found")

        result = []

        for package in packages:
            package_id = str(package["_id"])

            # Fetch packagebody details using packagehead_id
            package_body = await app.state.db["packagebody"].find_one({"packagehead_id": package_id})
            
            packagebody_id = str(package_body["_id"]) if package_body else None
            description = package_body["packagebody_details"] if package_body else ""

            # Fetch gallery images using packagebody_id
            gallery_images = []
            if packagebody_id:
                images_cursor = app.state.db["gallery"].find({"packagebody_id": packagebody_id})
                async for img in images_cursor:
                    gallery_images.append(img["gallery_file"])  # Append each image to the package's array

            result.append({
                "_id": package_id,
                "package_name": package.get("packagehead_name", ""),
                "package_days": package.get("packagehead_days", 0),
                "package_price": package.get("packagehead_price", 0),
                "package_details": package.get("packagehead_details", ""),
                "package_status": package.get("packagehead_status", ""),
                "package_count": package.get("packagehead_count", 0),
                "package_room_count": package.get("packagehead_room_count", 0),
                "description": description,
                "images": gallery_images  # All images related to this package are inside this array
            })

        return result

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")
   
   
# @app.get("/package/{package_id}")
# async def read_package_details(package_id: str):
#     try:
#         # Fetch packagehead details
#         package = await app.state.db["packagehead"].find_one({"_id":  ObjectId(package_id)})
#         if not package:
#             raise HTTPException(status_code=404, detail="Package not found")

#         # Fetch packagebody details
#         package_body = await app.state.db["packagebody"].find_one({"packagehead_id": package_id})
#         packagebody_id = str(package_body["_id"]) if package_body else None
#         description = package_body["packagebody_details"] if package_body else ""

#         # Fetch gallery images
#         gallery_images = []
#         if packagebody_id:
#             images = await app.state.db["gallery"].find({"packagebody_id": packagebody_id}).to_list(10)
#             gallery_images = [img["gallery_file"] for img in images] if images else []

#         return {
#             "_id": package_id,
#             "package_name": package.get("packagehead_name", ""),
#             "package_days": package.get("packagehead_days", 0),
#             "package_price": package.get("packagehead_price", 0),
#             "package_details": package.get("packagehead_details", ""),
#             "package_status": package.get("packagehead_status", ""),
#             "package_count": package.get("packagehead_count", 0),
#             "package_room_count": package.get("packagehead_room_count", 0),
#             "description": description,
#             "images": gallery_images
#         }

#     except Exception as e:
#         raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")




# @app.get("/package/{package_id}")
# async def read_package_details(package_id: str):
#     try:
#         # Convert package_id to ObjectId
#         try:
#             obj_id = ObjectId(package_id)
#         except:
#             raise HTTPException(status_code=400, detail="Invalid package ID format")

#         # Fetch packagehead details
#         package = await app.state.db["packagehead"].find_one({"_id": obj_id})
#         if not package:
#             raise HTTPException(status_code=404, detail="Package not found")

#         # Fetch packagebody details
#         package_body = await app.state.db["packagebody"].find_one({"packagehead_id": str(obj_id)})
#         packagebody_id = str(package_body["_id"]) if package_body else None
#         description = package_body["packagebody_details"] if package_body else ""

#         # Fetch gallery images
#         gallery_images = []
#         if packagebody_id:
#             images = await app.state.db["gallery"].find({"packagebody_id": packagebody_id}).to_list(10)
#             gallery_images = [img["gallery_file"] for img in images] if images else []

#         # Fetch hotel details using `hotel_id` from packagehead
#         hotel = None
#         hotel_id = package.get("hotel_id")
#         if hotel_id:
#             try:
#                 hotel_obj_id = ObjectId(hotel_id)  # Convert hotel_id to ObjectId
#                 hotel = await app.state.db["hotels"].find_one({"_id": hotel_obj_id})
#                 if hotel:
#                     hotel["_id"] = str(hotel["_id"])  # Convert ObjectId to string
#             except:
#                 hotel = None

#         return {
#             "_id": str(package["_id"]),
#             "package_name": package.get("packagehead_name", ""),
#             "package_days": package.get("packagehead_days", 0),
#             "package_price": package.get("packagehead_price", 0),
#             "package_details": package.get("packagehead_details", ""),
#             "package_status": package.get("packagehead_status", ""),
#             "package_count": package.get("packagehead_count", 0),
#             "package_room_count": package.get("packagehead_room_count", 0),
#             "description": description,
#             "images": gallery_images,
#             "hotel": hotel if hotel else "Hotel details not available"
#         }

#     except Exception as e:
#         raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")
# @app.get("/package/{package_id}")
# async def read_package_details(package_id: str):
#     try:
#         try:
#             obj_id = ObjectId(package_id)
#         except:
#             raise HTTPException(status_code=400, detail="Invalid package ID format")

#         # Fetch package details
#         package = await app.state.db["packagehead"].find_one({"_id": obj_id})
#         if not package:
#             raise HTTPException(status_code=404, detail="Package not found")

#         # Fetch all package bodies related to the packagehead_id
#         package_bodies = await app.state.db["packagebody"].find({"packagehead_id": str(obj_id)}).to_list(None)

#         # Prepare package body details and fetch gallery images for each packagebody_id
#         package_body_list = []
#         all_gallery_images = []  # To store all images across all package bodies

#         for package_body in package_bodies:
#             packagebody_id = str(package_body["_id"])
#             description = package_body.get("packagebody_details", "")

#             # Fetch all gallery images for this packagebody_id
#             images = await app.state.db["gallery"].find({"packagebody_id": packagebody_id}).to_list(None)
#             gallery_images = [img["gallery_file"].replace("\\", "/") for img in images] if images else []

#             # Store gallery images at the package level
#             all_gallery_images.extend(gallery_images)

#             package_body_list.append({
#                 "packagebody_id": packagebody_id,
#                 "description": description,
#                 "images": gallery_images
#             })

#         # Fetch hotel details
#         hotel = None
#         hotel_id = package.get("hotel_id")
#         if hotel_id:
#             try:
#                 hotel_obj_id = ObjectId(hotel_id)
#                 hotel = await app.state.db["hotel"].find_one({"_id": hotel_obj_id})
#                 if hotel:
#                     hotel = {
#                         "id": str(hotel["_id"]),
#                         "hotel_name": hotel.get("hotel_name", "N/A"),
#                         "hotel_address": hotel.get("hotel_address", "N/A"),
#                         "hotel_email": hotel.get("hotel_email", "N/A"),
#                         "hotel_photo": hotel.get("hotel_photo", "https://via.placeholder.com/150").replace("\\", "/"),
#                         "hotel_status": hotel.get("hotel_status"),
#                     }
#             except:
#                 hotel = None

#         return {
#             "_id": str(package["_id"]),
#             "package_name": package.get("packagehead_name", ""),
#             "package_days": package.get("packagehead_days", 0),
#             "package_price": package.get("packagehead_price", 0),
#             "package_details": package.get("packagehead_details", ""),
#             "package_status": package.get("packagehead_status", ""),
#             "package_count": package.get("packagehead_count", 0),
#             "package_room_count": package.get("packagehead_room_count", 0),
#             "package_bodies": package_body_list,  # Now returns all package bodies
#             "all_gallery_images": all_gallery_images,  # Now returns all images across all package bodies
#             "hotel": hotel if hotel else "Hotel details not available"
#         }

#     except Exception as e:
#         raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")





@app.get("/package/{package_id}")
async def read_package_details(package_id: str):
    try:
        try:
            obj_id = ObjectId(package_id)
        except:
            raise HTTPException(status_code=400, detail="Invalid package ID format")

        # Fetch package details
        package = await app.state.db["packagehead"].find_one({"_id": obj_id})
        if not package:
            raise HTTPException(status_code=404, detail="Package not found")

        # Fetch all package bodies related to the packagehead_id
        package_bodies = await app.state.db["packagebody"].find({"packagehead_id": str(obj_id)}).to_list(None)

        # Prepare package body details and fetch gallery images for each packagebody_id
        package_body_list = []
        all_gallery_images = []  # To store all images across all package bodies

        for package_body in package_bodies:
            packagebody_id = str(package_body["_id"])
            description = package_body.get("packagebody_details", "")
            place_id = package_body.get("place_id")  # Get place_id

            # Fetch place name if place_id exists
            place_name = "Unknown"
            if place_id:
                place = await app.state.db["place"].find_one({"_id": ObjectId(place_id)})
                if place:
                    place_name = place.get("place_name", "Unknown")

            # Fetch all gallery images for this packagebody_id
            images = await app.state.db["gallery"].find({"packagebody_id": packagebody_id}).to_list(None)
            gallery_images = [img["gallery_file"].replace("\\", "/") for img in images] if images else []

            # Store gallery images at the package level
            all_gallery_images.extend(gallery_images)

            package_body_list.append({
                "packagebody_id": packagebody_id,
                "description": description,
                "place_name": place_name,  # Add place name
                "images": gallery_images
            })

        # Fetch hotel details
        hotel = None
        hotel_id = package.get("hotel_id")
        if hotel_id:
            try:
                hotel_obj_id = ObjectId(hotel_id)
                hotel = await app.state.db["hotel"].find_one({"_id": hotel_obj_id})
                if hotel:
                    hotel = {
                        "id": str(hotel["_id"]),
                        "hotel_name": hotel.get("hotel_name", "N/A"),
                        "hotel_address": hotel.get("hotel_address", "N/A"),
                        "hotel_email": hotel.get("hotel_email", "N/A"),
                        "hotel_photo": hotel.get("hotel_photo", "https://via.placeholder.com/150").replace("\\", "/"),
                        "hotel_status": hotel.get("hotel_status"),
                    }
            except:
                hotel = None

        return {
            "_id": str(package["_id"]),
            "package_name": package.get("packagehead_name", ""),
            "package_days": package.get("packagehead_days", 0),
            "package_price": package.get("packagehead_price", 0),
            "package_details": package.get("packagehead_details", ""),
            "package_status": package.get("packagehead_status", ""),
            "package_count": package.get("packagehead_count", 0),
            "package_room_count": package.get("packagehead_room_count", 0),
            "package_bodies": package_body_list,  # Now returns all package bodies with place names
            "all_gallery_images": all_gallery_images,  # Now returns all images across all package bodies
            "hotel": hotel if hotel else "Hotel details not available"
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")
