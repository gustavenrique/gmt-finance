import { Client, Account, ID, Databases } from 'react-native-appwrite';


export const config = {
  endpoint: 'https://cloud.appwrite.io/v1',
  platform: 'com.finance.gmt',
  projectId: '6747a1f400376a0055e3',
  databaseId: '6747a38f002ef746824e',
  userCollectionId: '6747a3aa000fa3c52cad', 
  walletCollectionId: '6747aa590015997274a4'
};


const client = new Client();
client
  .setEndpoint(config.endpoint)
  .setProject(config.projectId)
  .setPlatform(config.platform);


const account = new Account(client);
const databases = new Databases(client);

// Cadastro
export const createUser = async (email, password, username) => {
  try {
    // Criação da conta no Appwrite
    const userResponse = await account.create(ID.unique(), email, password, username);
    console.log('User created successfully:', userResponse);

    // Salvar o usuário na coleção 'users'
    const userData = {
      username: userResponse.name || username, 
      email: userResponse.email,
      //userId: user.$id // Associa o ID gerado ao documento na coleção
    };

    const databaseResponse = await databases.createDocument(
      config.databaseId, 
      config.userCollectionId,
      ID.unique(), 
      userData
    );

    console.log('User saved to collection:', databaseResponse);
    return databaseResponse; // Retorna a resposta da coleção
  } catch (error) {
    console.error('Error creating or saving user:', error);
    throw new Error('Error creating or saving user.');
  }
};

// Função para fazer login do usuário
export const loginUser = async (email, password) => {
    try {
      const session = await account.createEmailSession(email, password);
      console.log('Login successful:', session);
      return session;
    } catch (error) {
      console.error('Login failed:', error.message || error);
      if (error.code === 401) {
        throw new Error('Credenciais inválidas. Verifique seu e-mail e senha.');
      } else {
        throw new Error('Erro inesperado no login. Tente novamente mais tarde.');
      }
    }
  };

// Função para atualizar os dados do usuário no Appwrite
export const updateUserProfile = async (username, email) => {
  try {
    const user = await account.get(); // Pega os dados do usuário logado
    const userId = user.$id; // ID do usuário logado

    // Exibe o ID do usuário para depuração
    console.log('ID do usuário logado:', userId);

    // Verifica se o documento do usuário existe na coleção
    const existingUser = await databases.getDocument(config.databaseId, config.userCollectionId, userId);
    if (!existingUser) {
      console.error('Documento do usuário não encontrado na coleção!');
      throw new Error('Documento do usuário não encontrado na coleção!');
    }

    // Atualiza o nome na coleção, se necessário
    if (username !== user.name) {
      const userData = {
        username: username || user.name, // Atualiza o nome, se fornecido
        email: user.email,
      };

      // Atualiza o documento do usuário na coleção
      const databaseResponse = await databases.updateDocument(
        config.databaseId, 
        config.userCollectionId, 
        userId,  // Usando o ID do usuário logado
        userData
      );

      console.log('Nome atualizado na coleção:', databaseResponse);
    }

    // Atualiza o e-mail no Appwrite, se necessário
    if (email !== user.email) {
      await account.updateEmail(email); 
      console.log('E-mail atualizado no Appwrite');
    }

    return { success: true };
  } catch (error) {
    console.error('Erro ao atualizar perfil:', error);
    throw new Error('Erro ao atualizar perfil.');
  }
};

export { account, databases };
