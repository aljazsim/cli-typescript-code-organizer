import Admin from "../admin-variables";
import App from "../app-variables";
import { DeleteForm } from "../infrastructure/admin/form-builder/toolbar/delete-form";
import { SaveForm } from "../infrastructure/admin/form-builder/toolbar/save-form";
import { Form } from "../infrastructure/app/form-tab";
import logger from "../logger-variables";
import { TestCafe } from "../roles";
/*This is a Admin Test Example. 
Imports: You will need to add ../ for every folder deep the file is.

Loggers: if using more than 1 they will have to be comma seperated in the requestHooks line. 
*/
import * as dotenv from "dotenv";
import { Selector } from "testcafe";

// Folders for this Suite
const folder = Admin.Navigation.AdvancedForms;
const subfolder = Admin.Navigation.AdvancedText;
const folderOption = Admin.getFolderOption(folder, subfolder);
const roleOption = Selector('[id="ZZ Test Cafe-checkbox"] label');

// Declare the variable 'AdminTestSuccess' for tracking if Admin side passed. This is to prevent running the Admin side test multiple times.
let AdminTestSuccess: { [key: string]: boolean } = {};

// Set environment variables
let Example = '';

// Load environment variables
if (!process.env.Example) {
    dotenv.config();
    Example = process.env.Example || '';
}

fixture(`Test Example`)
    .requestHooks(logger.saveForm, logger.submitForm)
    .beforeEach(async t => {
        await t.useRole(TestCafe);
        await Admin.loginSync(Admin.Credentials.TestCafe, Admin.Credentials.Password);
    });

//Example Test
test('Test Case: ##### - NEW', async t => {
    t.ctx.formName = 'Test Case: #####';

    //*ADMIN SIDE*//
    if (Admin.RunAdmin === true && (!AdminTestSuccess[`${t.ctx.formName}`])) {
        //check if form exists and if so it will be deleted
        await DeleteForm.delete(t.ctx.formName, folder, subfolder);
        //create a new form
        await Admin.createAdvancedForm(roleOption, folderOption, t.ctx.formName);

        //TODO: TEST GO HERE!//

        //save the form
        await SaveForm.saveForm();

        AdminTestSuccess[`${t.ctx.formName}`] = true; // Set the variable to true to prevent running the Admin side test multiple times
    }

    //*APP SIDE*//
    if (App.RunApp === true) {
        //open app
        await App.openApp(App.Credentials.TestCafe, App.Credentials.Password);
        //open form
        await Form.openForm(t.ctx.formName);

        //TODO: TEST GO HERE!//

        //submit form
        await Form.submitForm(logger.submitForm);
    }
});
