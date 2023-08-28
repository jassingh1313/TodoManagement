import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { createTodoApi, retrieveTodoApi, updateTodoApi } from "./api/TodoApiService"
import { useAuth } from "./security/Authcontext"
import {Formik, Form, Field, ErrorMessage} from 'formik'
import moment from 'moment'

export default function TodoComponent(){
    const {id} = useParams()
    const authContext = useAuth()
    const navigate = useNavigate()
    const username = authContext.username
    const [description, setDescription] = useState('')
    const [targetDate, setTargetDate] = useState('')


    useEffect(
        () => retrieveTodos(), [id]
    )
    //do this 

    function retrieveTodos(){

        if (id != -1)
        {
            retrieveTodoApi(username, id)
            .then(response => {
                setDescription(response.data.description)
                setTargetDate(response.data.targetDate)
            })
            .catch(error => {
                console.log(error)
            })
        }
    }

    //validate is always called before onSubmit.
    //whatever we entered in the form is passed in here.
    function onSubmit(values){
        // console.log(values)
        const todo = {
            id: id,
            username: username,
            description: values.description,
            targetDate: values.targetDate,
            done: false

        }
        // console.log(todo)
        if(id == -1)
        {
            createTodoApi(username, todo)
            .then(response => {
                console.log(response)
                navigate('/todos')
            })
            .catch(error => {
                console.log(error)
            })
            }
        else
        {
            updateTodoApi(username, id, todo)
            .then(response => {
                console.log(response)
                navigate('/todos')
            })
            .catch(error => {
                console.log(error)
            })
        }
    }

    //first validate is called. if no error then onSubmit is called.
    //if validate returns any errors back submit won't be called.
    //validate is continuously checking whenever we change something in the form 
    //when the if condition is true errors object will be updated and returned to the ErrorMessage component we used below that will display the message. if errors object is empty then message is not printed.

    //error message appears when error object has something
    //disappers when error object is empty
    //error object did have something called description but when the component is re rendered then the description doesn't exist since we typed a valid description. Dynamic rendering. 

    //React continuosly renders components?
    //by default validation is happening onChange and onBlur(when we click outside the field or tab away from it) 
    function validate(values){
        let errors = {
            // description: 'Enter a valid description',
            // targetDate: 'Enter a valid target date'
        }

        if(values.description.length < 5)
        {
            errors.description = 'Enter at least 5 characters'
        }

        if(values.targetDate == null || values.targetDate == '' || !moment(values.targetDate).isValid())
        {
            errors.targetDate = 'Enter a valid target date'
        }


        console.log(values)
        return errors
    }


    return (
        <div className="container">
            <h1>Enter Todo Details</h1>
            <div>
                <Formik  initialValues={{description, targetDate}} enableReinitialize = {true} onSubmit = {onSubmit}
                validate = {validate} validateOnChange = {false} validateOnBlur = {false}>
                {

                    (props) =>
                    (
                        <Form>
                            <ErrorMessage name = "description" component = "div" className="alert alert-warning"></ErrorMessage>
                            
                            <ErrorMessage name = "targetDate" component = "div" className="alert alert-warning"></ErrorMessage>
                            <fieldset className="form-group">
                                <label>Description</label>
                                <Field type ="text" className ="form-control" name = "description"></Field>

                            </fieldset>

                            <fieldset className="form-group">
                                <label>Target Date</label>
                                <Field type ="date" className ="form-control" name = "targetDate"></Field>
                            </fieldset>

                            <div>
                                <button className="btn btn-success m-5" type = "submit">Save
                                </button>
                            </div>
                        </Form>
                    )
                }
                </Formik>
            </div>

        </div>
    )


}