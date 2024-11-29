import { Client, Account, ID, Databases } from 'react-native-appwrite';

// Configuração do Appwrite
export const config = {
  endpoint: 'https://cloud.appwrite.io/v1',
  platform: 'com.finance.gmt',
  projectId: '6747a1f400376a0055e3',
  databaseId: '6747a38f002ef746824e',
  userCollectionId: '6747a3aa000fa3c52cad', // ID da coleção de usuários
  walletCollectionId: '6747aa590015997274a4'
};

// Inicialização do cliente Appwrite
const client = new Client();
client
  .setEndpoint(config.endpoint)
  .setProject(config.projectId)
  .setPlatform(config.platform);

// Instâncias de Account e Databases
const account = new Account(client);
const databases = new Databases(client);

// Função para criar um usuário no Appwrite e salvar na coleção
export const createUser = async (email, password, username) => {
  try {
    // Criação da conta no Appwrite
    const userResponse = await account.create(ID.unique(), email, password, username);
    console.log('User created successfully:', userResponse);

    // Salvar o usuário na coleção 'users'
    const userData = {
      username: userResponse.name || username, // Garante que o username seja salvo
      email: userResponse.email,
      //userId: userResponse.$id // Associa o ID gerado ao documento na coleção
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

// Exportando as instâncias para uso em outros arquivos
export { account, databases, Client, Account, Databases, ID };
