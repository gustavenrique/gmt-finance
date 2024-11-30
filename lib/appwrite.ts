import { Client, Account, ID, Databases } from "react-native-appwrite";

export const config = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.finance.gmt",
  projectId: "6747a1f400376a0055e3",
  databaseId: "6747a38f002ef746824e",
  userCollectionId: "6747a3aa000fa3c52cad",
  walletCollectionId: "6747aa590015997274a4",
};

const client = new Client();
client
  .setEndpoint(config.endpoint)
  .setProject(config.projectId)
  .setPlatform(config.platform);

const account = new Account(client);
const databases = new Databases(client);

export const createUser = async (
  email: string,
  password: string,
  username: string
) => {
  try {
    const userResponse = await account.create(
      ID.unique(),
      email,
      password,
      username
    );
    console.log("User created successfully:", userResponse);

    const userData = {
      username: userResponse.name || username,
      email: userResponse.email,
    };

    const databaseResponse = await databases.createDocument(
      config.databaseId,
      config.userCollectionId,
      ID.unique(),
      userData
    );

    console.log("User saved to collection:", databaseResponse);
    return databaseResponse;
  } catch (error) {
    console.error("Error creating or saving user:", error);
    throw error;
  }
};

export const loginUser = async (email: string, password: string) => {
  try {
    try {
      await account.deleteSessions();
    } catch {}

    const session = await account.createEmailSession(email, password);
    console.log("Login successful:", session);
    return session;
  } catch (error) {
    console.error("Login failed:", error.message || error);
    if (error.code === 401) {
      throw new Error("Credenciais inválidas. Verifique seu e-mail e senha.");
    } else {
      throw new Error("Erro inesperado no login. Tente novamente mais tarde.");
    }
  }
};

export const updateUserProfile = async (
  username: string,
  email: string,
  password: string | null
) => {
  try {
    const user = await account.get();

    if (username !== user.name) {
      await account.updateName(username || user.name);
    }

    if (email !== user.email) {
      await account.updateEmail(email, password);
      console.log("E-mail atualizado no Appwrite");
    }

    return { success: true };
  } catch (error) {
    console.error("Erro ao atualizar perfil:", error);
    throw error;
  }
};

export { account, databases };
