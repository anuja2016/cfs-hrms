export const formatDate = (dateString) => {
    const date = new Date(dateString);

    // Extract the individual date components
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Month index starts from 0
    const day = String(date.getDate()).padStart(2, "0");

    // Format the date as "dd/mm/yyyy"
    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
};

export const parseDate = (formattedDate) => {
    // Split the formatted date string into day, month, and year parts
    const [day, month, year] = formattedDate.split("/");

    // Create a new Date object with the parsed values
    const parsedDate = new Date(`${year}-${month}-${day}`);

    // Check if the parsed date is valid
    if (isNaN(parsedDate.getTime())) {
        throw new Error("Invalid date format");
    }

    return parsedDate;
};