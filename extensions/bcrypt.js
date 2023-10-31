import bcryptjs from 'bcryptjs';

const BC = {
  hash: bcryptjs.hashSync,
  compare: bcryptjs.compareSync
}

export default BC;