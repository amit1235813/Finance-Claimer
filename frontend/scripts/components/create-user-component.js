export const CreateUserComponent = {
    render: function() {
        return `

        <form id='createUserForm'>
        <!-- Validation
        https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input -->
        <label for="name">First Name</label>
        <input type="text" name="firstName" required autofocus minlength="1" maxlength="255">
    
        <label for="description">Last Name</label>
        <input type="text" name="lastName" required minlength="1" maxlength="255">
    
        <label for="task">Email</label>
        <input type="email" name="email" required minlength="1" maxlength="255" pattern="^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]+)(\.[a-z]+)*$">
    
        <!-- <label for="description">User Role</label>
        <input type="text" name="userRole" required onchange="bankDetails()"> -->
    
        <label for="userRole">User role</label>
    
        <select name="userRole" id="userRole">
            <option value="Project Manager">Project Manager</option>
            <option value="Associate Project Manager">Associate Project Manager</option>
            <option value="Bangalore Team">Bangalore Team</option>
            <option value="Mumbai Team">Mumbai Team</option>
            <option value="Delhi Team">Delhi Team</option>
        </select>
    
        <label class="bankDetails" for="description">Account Name</label>
        <input class="bankDetails" type="text" name="accountName" required minlength="1" maxlength="255">
    
        <label class="bankDetails" for="description">Bank Name</label>
        <input class="bankDetails" type="text" name="bankName" required minlength="1" maxlength="255">
    
        <label class="bankDetails" for="description">Account no</label>
        <input class="bankDetails" type="number" name="bankAccountNumber" required>
    
        <label class="bankDetails" for="description">IFSC code</label>
        <input class="bankDetails" type="text" name="ifscCode" required pattern="^[a-z\\d]{5,12}\$">
    
        <button type="submit" >Submit</button>
    </form>

        `
    }
}