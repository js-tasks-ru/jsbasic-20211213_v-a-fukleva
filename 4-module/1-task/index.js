const d = document;

function makeFriendsList(friends) {
  const friendsList = d.createElement('ul');

  friends.forEach(friend => {
    const oneFriend = d.createElement('li');
    oneFriend.textContent = friend.firstName + ' ' + friend.lastName;
    friendsList.appendChild(oneFriend)
  })

  return friendsList
}
