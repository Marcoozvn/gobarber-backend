import UserToken from '../entities/typeorm/UserToken';

export default interface IUserTokensRepository {
  generate(user_id: string): Promise<UserToken>;
}
