import React, {useEffect, useState} from "react";
import TextField from '@material-ui/core/TextField';
import { Radio, RadioGroup, FormControlLabel, FormControl, FormHelperText } from '@mui/material';
import { object, string } from 'yup';
import UsersAPI from "../api/UsersAPI";
import FormData from "form-data";
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';

const NAME = 'name';
const EMAIL = 'email';
const PHONE = 'phone';
const POSITION = 'position';
const PHOTO = 'photo';

const labels = {
    [NAME]: 'Your name',
    [EMAIL]: 'Email',
    [PHONE]: 'Phone',
};

const schema = object().shape({
    name: string().label(labels[NAME]).required().min(2).max(60),
    email: string().label(labels[EMAIL]).required().email(),
    phone: string().label(labels[PHONE]).required().matches(/^[\+]{0,1}380([0-9]{9})$/, 'Please enter valid phone').required(),
    position: string().required('Please select your position'),
});

const Form = ({ createdNewUser, setCreatedNewUser }) => {
    const [data, setData] = useState({});
    const [errors, setErrors] = useState([]);
    const [fileError, setFileError] = useState('');
    const [positions, setPositions] = useState([]);
    const [fileName, setFileName] = useState('');
    const [token, setToken] = useState();
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        UsersAPI.getPositions().then(({ data }) => {
            setPositions(data.positions);
        })
            .catch((error) => console.log(error))
    }, []);

    useEffect(() => {
        UsersAPI.getToken().then(({ data }) => {
            setToken(data.token);
        })
            .catch((error) => console.log(error))
    }, []);

    const validation = async () => {
        const validationResult = await schema
            .validate(data, { abortEarly: false })
            .catch((err) => {
                return err;
            });

        setErrors(validationResult.errors);

        if (validationResult.errors) {
            return false;
        }

        return true;
    };

    const handleChangeInput = ({ target: { name, value, files }}) => {
        if (name == PHOTO) {
            console.log({ ...files[0] });
            const fileSize = Math.round(files[0].size / 1024); //convert file size from bytes to kb
            const minimumFileSize = Math.round(70*70*2/1024);
            const maximumFileSize = 1024 * 5;

            setFileName(files[0].name);
            setData({ ...data, [name]: files[0] });

            if (fileSize < minimumFileSize) {
                setFileError('The photo size must not be less than 10 Kb');
            } else if (fileSize > maximumFileSize) {
                setFileError('The photo size must not be greater than 5 Mb');
            } else {
                setFileError('');
            }

            return;
        }

        setData({ ...data, [name]: value });
    };

    const handleSubmit = () => {
        validation().then((result) => {
            if (fileError) {
                return;
            }

            if (!data.photo) {
                setFileError("The photo is required");
                return;
            }

            if (result) {
                const file = new FormData();

                file.append('name', data.name);
                file.append('position_id', data.position);
                file.append('email', data.email);
                file.append('phone', data.phone);
                file.append('photo', data.photo);

                UsersAPI.postUser(file, token)
                    .then((response) => {
                        if (response.data.success) {
                            setCreatedNewUser(true);
                            return;
                        }
                    })
                    .catch(({ response }) => enqueueSnackbar(response.data.message, { variant: 'error' }));
            }
        });
    };

    const errorText = (field) => errors && errors.find((er) => er.toLowerCase().includes(field));

    return (
        <div className="app__form" id="form">
            {!createdNewUser ? (
                <>
                    <h1 className="app__form-title">Working with POST request</h1>
                    <div className="app__inputs-container">
                        <TextField
                            name={NAME}
                            label={labels[NAME]}
                            variant="outlined"
                            className="input"
                            onChange={(event) => handleChangeInput(event.nativeEvent)}
                            error={!!errorText(NAME)}
                            helperText={errorText(NAME)}
                        />
                        <TextField
                            name={EMAIL}
                            label={labels[EMAIL]}
                            variant="outlined"
                            className="input"
                            onChange={(event) => handleChangeInput(event)}
                            error={!!errorText(EMAIL)}
                            helperText={errorText(EMAIL)}
                        />
                        <TextField
                            name={PHONE}
                            label={labels[PHONE]}
                            variant="outlined"
                            className="input"
                            onChange={(event) => handleChangeInput(event)}
                            error={!!errorText(PHONE)}
                            helperText={errorText(PHONE) ? errorText(PHONE) : '+38 (XXX) XXX - XX - XX'}
                        />
                        <FormControl error={!!errorText(POSITION)}>
                            <p className="app__form-radio-text">Select your position</p>
                            <RadioGroup
                                name={POSITION}
                                onChange={(event) => handleChangeInput(event)}
                                helperText={errorText(POSITION)}
                            >
                                {positions && positions.map((position) => (
                                    <FormControlLabel value={position.id} control={<Radio />} label={position.name} />
                                ))}
                            </RadioGroup>
                            <FormHelperText>{errorText(POSITION)}</FormHelperText>
                        </FormControl>
                        <input
                            name={PHOTO}
                            accept="image/jpeg, image/jpg"
                            className="input__file"
                            id="button-file"
                            multiple
                            type="file"
                            onChange={(event) => handleChangeInput(event)}
                        />
                        <label htmlFor="button-file">
                            <div className={`${fileError ? 'app__form-file-button error' : 'app__form-file-button'}`}>Upload</div>
                            <input
                                disabled
                                placeholder="Upload your photo"
                                className={`${fileError ? 'app__form-file-name error' : 'app__form-file-name'}`}
                                value={fileName}
                            />
                            <div className="app__form-file-error">{fileError && fileError}</div>
                        </label>
                        <button className="app__form-button button" onClick={handleSubmit}>Sign up</button>
                    </div>
                </>
            ) : (
                <>
                    <h1 className="app__form-title">User successfully registered</h1>
                    <div className="app__form-created-user"></div>
                </>
            )}
        </div>
    );
};

Form.propTypes = {
    createdNewUser: PropTypes.bool.isRequired,
    setCreatedNewUser: PropTypes.func.isRequired,
}

export { Form };
