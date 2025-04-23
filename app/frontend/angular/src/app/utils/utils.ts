export const checkPassword = (password: string, confirmPassword: string): boolean => {
    if (password !== confirmPassword) {
      console.error('Lozinke se ne poklapaju!');
      return false;
    }
    return true;
  }