export const handlePurchaseEmail = async (
  currentUser,
  bookId,
  bookPrice,
  purchaseType
) => {
  try {
    const response = await fetch("/api/books/create-purchase", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${currentUser.accessToken}`,
      },
      body: JSON.stringify({
        userUid: currentUser.uid,
        bookId: bookId,
        price: bookPrice,
        userEmail: currentUser.email,
        purchaseType,
      }),
    });
    const data = response.json();

    return data;
  } catch (error) {
    console.log(error);
    throw Error();
  }
};

export const handleLoanEmail = async (
  currentUser,
  bookId,
  loanDuration,
  loanPrice,
  purchaseType
) => {
  try {
    const response = await fetch("/api/books/create-loan", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${currentUser.accessToken}`,
      },
      body: JSON.stringify({
        userUid: currentUser.uid,
        bookId: bookId,
        loanDuration,
        userEmail: currentUser.email,
        loanPrice,
        purchaseType,
      }),
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
    throw Error();
  }
};
