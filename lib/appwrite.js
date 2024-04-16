import { 
    Account, 
    Avatars, 
    Client, 
    Databases, 
    ID, 
    Query} from 'react-native-appwrite';

        //Appwrite config 
export const config = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.alpha.lumina',
    projectId: '661e3da9a498db9d778a',
    databaseId: '661e4054c8b33011c91d',
    userCollectionId: '661e408a3210c91561d8',
    videoCollectionId: '661e40f5780607d7942b',
    storageId: '661e439bd04ad88c5612',
}
          //create new client
const client = new Client();

client
    .setEndpoint(config.endpoint) 
    .setProject(config.projectId) 
    .setPlatform(config.platform) 
;
          
           //initialization
const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);
                
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
            config.databaseId,
            config.userCollectionId,
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

export const getCurrentUser = async()=> {
    try {
       const currentAccount = await account.get();
       
       if(!currentAccount) throw Error;

       const currentUser = await databases.listDocuments(
        config.databaseId,
        config.userCollectionId,
        [Query.equal('accountId', currentAccount.$id)]
       )

       if(!currentUser) throw Error;

       return currentUser.documents[0];

    } catch (error) {
        console.log(error);
    }
}