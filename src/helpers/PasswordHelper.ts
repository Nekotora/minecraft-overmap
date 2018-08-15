import * as bcryptjs from 'bcryptjs';
export namespace PasswordHelper {

  export function hash(data: string): string {
    bcryptjs.genSaltSync(10);
    return bcryptjs.hashSync(data, "so-salt");
  }

  export function compare(data: string, encrypted: string): boolean {
    return bcryptjs.compareSync(encrypted, data);
  }

}