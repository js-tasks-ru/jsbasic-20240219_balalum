function makeFriendsList(friends) {
  let listFriends = document.createElement('UL');

  for (let friend of friends) {
    listFriends.insertAdjacentHTML('beforeEnd', `<li>${friend.firstName} ${friend.lastName}</li>`)
  }

  return listFriends;
}
