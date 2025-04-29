import { User, BookDetails, BorrowDetails } from '../models/model';
let url = "http://localhost:5022/api/library";

export async function checkUser(email: string): Promise<boolean> {
    let apiURL = `${url}/usercontroller/${email}`;
    let response = await fetch(apiURL);
    if (!response.ok) {
        return false;
    }
    return await response.json();
}

export async function login(email: string, password: string): Promise<boolean> {
    const response = await fetch(`${url}/auth/login`, {
        method: "POST",
        credentials: "include", // <--- Important!
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
    });

    if (!response.ok) {
        return false;
    }
    return response.ok;

}

export async function isAuthenticated(): Promise<any> {
    try {
        const response = await fetch(`${url}/auth/me`, {
            method: "GET",
            credentials: "include", // Ensure cookies are sent with the request
        });

        if (response.ok) {
            const data = await response.json();
            return {
                success: true,
                email: data.email,
                name:data.name
            };
        }

        return { success: false }; // If not authenticated, return false
    } catch (error) {
        //console.error("Error fetching user credentials:", error);
        return { success: false }; // Return false in case of an error
    }
}

export function logout(): Promise<void> {
    return fetch(`${url}/auth/logout`, {
        method: "POST",
        credentials: "include",
    }).then(() => { });
}

export async function addNewUser(user: User): Promise<string> {
    let apiURL = `${url}/usercontroller/newUser/${user}`;
    let response = await fetch(apiURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });

    if (!response.ok) {
        throw new Error("Fail to add data");
    }
    return await response.text();
}


export async function getIndividualUser(mailID: string): Promise<User | null> {

    let apiURL = `${url}/usercontroller/${mailID}`;
    let response = await fetch(apiURL);
    if (!response.ok) {
        return null;
    }
    //returns true if the customer is already exist
    return await response.json();
}

export async function RechargeWalletBalance(userID: number, amount: number): Promise<void> {
    let apiURL = `${url}/usercontroller/recharge/${userID}/${amount}`;
    let response = await fetch(apiURL, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (!response.ok) {
        throw new Error("Fail to update data");
    }
}

export async function fetchBooks(): Promise<BookDetails[]> {
    let apiURL = `${url}/bookdetailscontroller/books`;
    let response = await fetch(apiURL);
    if (!response.ok) {
        throw new Error("Fail to fetch data");
    }
   
    return await response.json();
}

export async function getIndividualBook(bookID: number): Promise<BookDetails | null> {
    let apiURL = `${url}/bookdetailscontroller/get/books/${bookID}`;
    let response = await fetch(apiURL);

    if (!response.ok) {
        return null;
    }
    //returns product
    return await response.json();
}

export async function addNewBook(product: BookDetails): Promise<string> {
    let apiURL = `${url}/bookdetailscontroller/add/newBook`;
    let response = await fetch(apiURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
    });

    if (!response.ok) {
        throw new Error("Fail to add data");
    }
    return await response.text();
}

export async function checkBookExist(booktName: string): Promise<boolean> {
    let apiURL = `${url}/bookdetailscontroller/book/${booktName}`;
    let response = await fetch(apiURL);

    if (!response.ok) {
        throw new Error("Fail to fetch data");
    }
    //returns true if the product is already exist
    return await response.json();
}

export async function editBookDetail(book: BookDetails): Promise<void> {
    let apiURL = `${url}/bookdetailscontroller/new/book/edit`;
    let response = await fetch(apiURL, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(book)
    });
    if (!response.ok) {
        throw new Error("Fail to update data");
    }
}

export async function deleteBookDetail(bookID: number): Promise<void> {
    let apiURL=`${url}/bookdetailscontroller/delete/${bookID}`
    const response = await fetch(apiURL, {
        method: 'DELETE'
    });
    if (!response.ok) {
        throw new Error('Failed to delete contact');
    }
}

export async function getBorrowCount(userID:number):Promise<number> {
    let apiURL=`${url}/borrowDetailsconroller/get/borrowCount/${userID}`;
    let response=await fetch(apiURL);
    return await response.json();
    
}
export async function fetchBorrows(): Promise<BorrowDetails[]> {
    let apiURL = `${url}/borrowDetailscontroller/borrow`;
    let response = await fetch(apiURL);
    if (!response.ok) {
        throw new Error("Fail to fetch data");
    }
    return await response.json();
}

export async function getIndividualBorrow(borrowID: number): Promise<BorrowDetails | null> {
    let apiURL = `${url}/borrowdetailscontroller/get/borrow/${borrowID}`;
    let response = await fetch(apiURL);
    if (!response.ok) {
        return null;
    }
    //returns product
    return await response.json();
}

export async function returnBook(userID: number, borrowID: number,fineAmount:number): Promise<void> {
    let apiURL = `${url}/borrowdetailscontroller/return/${userID}/${borrowID}/${fineAmount}`;
    let response = await fetch(apiURL, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (!response.ok) {
        throw new Error("Fail to update data");
    }
}

// write a function to add a new order

export async function addNewBorrow(userID: number, bookID: number): Promise<void> {
    let apiURL = `${url}/borrowdetailscontroller/add/newborrow/${userID}/${bookID}`;
    let response = await fetch(apiURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (!response.ok) {
        throw new Error("Fail to add data");
    }
   
}
export async function deleteBorrow(bookID:number) {
    let apiURL=`${url}/borrowdetailscontroller/delete/${bookID}`;
    
    const response = await fetch(apiURL, {
        method: 'DELETE'
    });
    if (!response.ok) {
        throw new Error('Failed to delete contact');
    }
}
