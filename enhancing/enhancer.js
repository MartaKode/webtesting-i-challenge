module.exports = {
  success,
  fail,
  repair,
  get,
};
//`````````success``````````````
function success(item) {
  if(item.enhancement > 20){
    throw new Error('enhancement level cannot be greater than 20')
  } else if(item.enhancement < 0) {
    item.enhancement = 0
  }

  const newItem = {
    name: item.name,
    durability: item.durability,
    enhancement: item.enhancement === 20 ? item.enhancement : (item.enhancement + 1)
  }

  return { ...newItem };
}

//```````````fail```````````````
function fail(item) {

  if(item.enhancement > 20){

    throw new Error('enhancement level cannot be greater than 20')

  } else if(item.enhancement < 0) {
    throw new Error ('enhancement level cannot be negative')
  }
   else if( item.enhancement < 15 && item.enhancement >= 0) {

    if(item.durability >= 5 ){
      item.durability = item.durability - 5
    } else {
      item.durability = 0
    }

  } else if (  item.enhancement >= 15 && item.enhancement < 17) {

   if(item.durability >= 10){
      item.durability = item.durability - 10
    } else {
      item.durability = 0
    }

  } else if ( item.enhancement >= 17 ){

    if(item.durability >= 10){
      item.durability = item.durability - 10
      item.enhancement = item.enhancement - 1
    } else {
      item.durability = 0
      item.enhancement = item.enhancement - 1
    }

  }


  const newItem = {
    name: item.name,
    durability: item.durability,
    enhancement: item.enhancement
  }

  return { ...newItem };
}

//````````repair````````````
function repair(item) {
  return { ...item, durability: 100 };
}


//`````````get````````````
function get(item) {

if(item.enhancement > 0){
  item.name = `[+${item.enhancement}] ${item.name}`
} else {
  item.enhancement = 0
}

  const newItem = {
    ...item,
    name: item.name
  }

  return { ...newItem };
}
