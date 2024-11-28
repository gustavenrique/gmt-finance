import { Client, Account, ID, Databases } from 'react-native-appwrite';

// Configuração do Appwrite
export const config = {
  endpoint: 'https://cloud.appwrite.io/v1',
  platform: 'com.finance.gmt',
  projectId: '6747a1f400376a0055e3',
  databaseId: '6747a38f002ef746824e',
  userCollectionId: '6747a3aa000fa3c52cad', // ID da coleção de usuários
  walletCollectionId: '6747aa590015997274a4'
}

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

    // Agora vamos salvar o usuário na coleção "users"
    const userData = {
      username: username,  // Adicionando o campo username
      email: email
    };

    const databaseResponse = await databases.createDocument(
      config.databaseId,  // O ID do seu banco de dados
      config.userCollectionId,  // O ID da coleção de usuários
      ID.unique(),  // ID único para o documento
      userData  // Dados do usuário a serem salvos
    );

    console.log('User saved to collection:', databaseResponse);
  } catch (error) {
    console.error('Error creating or saving user:', error);
  }
};

// Função para fazer login do usuário
export const loginUser = async (email, password) => {
  try {
    // Criação da sessão do usuário
    const session = await account.createSession(email, password);  // Método correto para login
    console.log('Login successful:', session);
    return session; // Retorna a sessão criada
  } catch (error) {
    console.error('Login failed:', error);
    throw error;  // Lança o erro para ser tratado no front-end
  }
};

// Exportando as instâncias para uso em outros arquivos
export { account, databases, Client, Account, Databases, ID };