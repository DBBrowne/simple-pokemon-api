import axios from 'axios'

import { tidyNewLines } from '../../src/common/stringUtils.js'

    return res.data
  }).catch(err=>console.log(err))
}
async function getDetails(nameOrId){
}

export default {
  getFullList,
  getDetails,
}