import Admin from "../../../../../admin-variables";
import App from "../../../../../app-variables";
import { LongTextBuilderAdvanced } from "../../../../../infrastructure/admin/form-builder/fields-pane/inputs/longtext-form-builder/longtext-form-builder-advanced";
import { DeleteForm } from "../../../../../infrastructure/admin/form-builder/toolbar/delete-form";
import { SaveForm } from "../../../../../infrastructure/admin/form-builder/toolbar/save-form";
import { LongTextField } from "../../../../../infrastructure/app/form-fields/longtext-field";
import { Form } from "../../../../../infrastructure/app/form-tab";
import logger from "../../../../../logger-variables";
import { TestCafe } from "../../../../../roles";

// Folders for this Suite
const folder = Admin.Navigation.AdvancedForms;
const subfolder = Admin.Navigation.AdvancedLongText;
const folderOption = Admin.getFolderOption(folder, subfolder);
const roles = ['LongText'];

// Declare the variable 'AdminTestSuccess' for tracking if Admin side passed. This is to prevent running the Admin side test multiple times.
let AdminTestSuccess: { [key: string]: boolean } = {};

fixture`Advanced Form - Long Text - Field Conditions`
    .requestHooks(logger.saveForm, logger.submitForm)
    .beforeEach(async t => {
        await t.useRole(TestCafe);
        await Admin.loginSync(Admin.Credentials.TestCafe, Admin.Credentials.Password);
    });

//Long Text - Field Condition - Required
test('Test Case: 15916 - OLD', async t => {
    t.ctx.formName = 'Test Case: 15916';

    //*ADMIN SIDE*//
    if (Admin.RunAdmin === true && (!AdminTestSuccess[`${t.ctx.formName}`])) {
        //check if form exists and if so it will be deleted
        await DeleteForm.delete(t.ctx.formName, folder, subfolder);
        //create a new form
        await Admin.createAdvancedForm(roles, folderOption, t.ctx.formName);

        //add Long Text field
        await LongTextBuilderAdvanced.addField();
        //add another Long Text field
        await LongTextBuilderAdvanced.addField();
        //edit the second Long Text field
        await LongTextBuilderAdvanced.editField('Long_Text_1');
        //add a field condition
        await LongTextBuilderAdvanced.addFieldConditionRule('(Long_Text is equal to Long_Text_1)', 'required');
        //complete edit
        await LongTextBuilderAdvanced.completeEdit();

        //save the form
        await SaveForm.saveForm();
        AdminTestSuccess[`${t.ctx.formName}`] = true; // Set the variable to true to prevent running the Admin side test multiple times
    }

    //*APP SIDE*//
    if (App.RunApp === true) {
        //open app
        await App.openApp(App.Credentials.LongText, App.Credentials.Password);
        //open form
        await Form.openForm(t.ctx.formName);

        //Try to submit the form expecting an error
        await Form.checkSubmitRequiredFieldError();
        //add 'test' to the Long_Text field
        await LongTextField.addValue('Long_Text', 'test');

        //submit form
        await Form.submitForm(logger.submitForm);
    }
});
// //Long Text - Field Condition - Read-Only
// test('Test Case: 15917 - OLD', async t => {
//     t.ctx.formName = 'Test Case: 15917';

//     //*ADMIN SIDE*//
//     if (Admin.RunAdmin === true && (!AdminTestSuccess[`${t.ctx.formName}`])) {
//         //check if form exists and if so it will be deleted
//         await DeleteForm.delete(t.ctx.formName, folder, subfolder);
//         //create a new form
//         await Admin.createAdvancedForm(roles, folderOption, t.ctx.formName);

//         //add Long Text field
//         await LongTextBuilderAdvanced.addField();
//         //add another Long Text field
//         await LongTextBuilderAdvanced.addField();
//         //edit the second Long Text field
//         await LongTextBuilderAdvanced.editField('Long_Text_1');
//         //add a field condition
//         await LongTextBuilderAdvanced.addFieldConditionRule('(Long_Text is equal to Long_Text_1)', 'read-only');
//         //complete edit
//         await LongTextBuilderAdvanced.completeEdit();

//         //save the form
//         await SaveForm.saveForm();
//         AdminTestSuccess[`${t.ctx.formName}`] = true; // Set the variable to true to prevent running the Admin side test multiple times
//     }

//     //*APP SIDE*//
//     if (App.RunApp === true) {
//         //open app
//         await App.openApp(App.Credentials.LongText, App.Credentials.Password);
//         //open form
//         await Form.openForm(t.ctx.formName);

//         //check for the Long_Text_1 field to be read-only
//         await LongTextField.isReadOnly('Long_Text_1', true);
//         //add 'test' to the Long_Text field
//         await LongTextField.addValue('Long_Text', 'test');
//         //check for the Long_Text_1 field to not be read-only
//         await LongTextField.isReadOnly('Long_Text_1', false);
//         //add 'test' to the Long_Text_1 field
//         await LongTextField.addValue('Long_Text_1', 'test');

//         //submit form
//         await Form.submitForm(logger.submitForm);
//     }
// });
