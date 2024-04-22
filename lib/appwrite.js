import { 
    Account, 
    Avatars, 
    Client, 
    Databases, 
    ID, 
    Query,
    Storage} from 'react-native-appwrite';

        //Appwrite config 
export const AppwriteConfig = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.alpha.lumina',
    projectId: '661e3da9a498db9d778a',
    databaseId: '661e4054c8b33011c91d',
    userCollectionId: '661e408a3210c91561d8',
    videoCollectionId: '661e40f5780607d7942b',
    storageId: '661e439bd04ad88c5612',
}

const {
    endpoint,
    platform,
    projectId,
    databaseId,
    userCollectionId,
    videoCollectionId,
    storageId,
} = AppwriteConfig;

          //create new client
const client = new Client();

client
    .setEndpoint(endpoint) 
    .setProject(projectId) 
    .setPlatform(platform) 
;
          
           //initialization
const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);
const storage = new Storage(client);
                
               //Register user
export const createUser = async(
    email,
    password,
    username
 )=> {
    
    try {
        console.log(username);
        const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            username
        );

        if(!newAccount) throw Error;

        const avatarUrl = avatars.getInitials(username);

        await signIn(email, password);

        const newUser = await databases.createDocument(
            databaseId,
            userCollectionId,
            ID.unique(),
            {
                accountId: newAccount.$id,
                email: email,
                username: username,
                avatar: avatarUrl,
            }
        );

        return newUser;

    } catch (error) {
        throw new Error(error);
    } 
    }
        
      //Sign in
export const signIn = async( 
    email, 
    password
 ) => {
   try {
     const session = await account.createEmailSession(email, password);
     return session;
   } catch (error) {
     console.log(error);
     throw new Error(error);
   }
}
      //Get the current users
export const getCurrentUser = async()=> {
    try {
       const currentAccount = await account.get();
       
       if(!currentAccount) throw Error;

       const currentUser = await databases.listDocuments(
        databaseId,
        userCollectionId,
        [Query.equal('accountId', currentAccount.$id)]
       )

       if(!currentUser) throw Error;

       return currentUser.documents[0];

    } catch (error) {
        console.log(error);
    }
} 
             //Get all posts
export const getAllPosts = async()=> {
     try {
        const posts = await databases.listDocuments(
            databaseId,
            videoCollectionId,
        );

        return posts.documents;
     } catch (error) {
        throw new Error(error);
     }
}
 
         //get latest posts
export const getLatestPosts = async()=> {
     try {
        const posts = await databases.listDocuments(
            databaseId,
            videoCollectionId,
            [Query.orderDesc('$createdAt', Query.limit(7))]
        );

        return posts.documents;
     } catch (error) {
        throw new Error(error);
     }
}
              //Searching posts
export const searchPosts = async(query)=> {
    try {
       const posts = await databases.listDocuments(
           databaseId,
           videoCollectionId,
           [Query.search('title', query)]
       );

       return posts.documents;
    } catch (error) {
       throw new Error(error);
    }
}
            //get user posts
export const getUserPosts = async(userId)=> {
    try {
       const posts = await databases.listDocuments(
           databaseId,
           videoCollectionId,
           [Query.equal('creator', userId)]
       );

       return posts.documents;
    } catch (error) {
       throw new Error(error);
    }
}
             //sign out
export const signOut = async()=> {
    try {
        const session = await account.deleteSession('current');
        return session; 
    } catch (error) {
        throw new Error(error);
    }
} 

    //upload file
export const uploadFile = async(file, type)=> {
      if(!file) return;
                
    const { mimeType, ...rest } = file;
    const asset = {
      name: file.fileName,
      type: file.mimeType,
      size: file.filesize,
      uri: file.uri,
    };
    
    try {
          const uploadedFile = await storage.createFile(
         storageId,
         ID.unique(),
         asset,
         );
    
         const fileUrl = await getFilePreview(uploadedFile.$id, type);
    
       return fileUrl;
      }  catch (error) {
        throw new Error(error);
       }
 }       


               //file preview
export const getFilePreview = async(fileId, type)=> {
    let fileUrl;
    console.log(fileId);

    try {
        if( type === 'video' ){
          fileUrl = storage.getFileView(storageId, fileId);
        } else if ( type === 'image' ){
          fileUrl = storage.getFilePreview(storageId, fileId, 2000, 2000, 'top', 100);
        } else {
            throw new Error('Invalid file type');
        }

        if(!fileUrl) throw Error;
        return fileUrl;
    } catch (error) {
        throw new Error(error);
    }
}


               //create video
export const createVideo = async(form)=> {
     try {
        const [ thumbnailUrl, videoUrl ] = await Promise.all([
            uploadFile(form.thumbnail, 'image'),
            uploadFile(form.video, 'video'),
        ]);

        const newPost = await databases.createDocument(
            databaseId,
            videoCollectionId,
            ID.unique(),
            {
                title: form.title,
                thumbnail: thumbnailUrl,
                video: videoUrl,
                prompt: form.prompt,
                creator: form.userId,
            }
        );
        return newPost;
     } catch (error) {
        throw new Error(error);
     }
}