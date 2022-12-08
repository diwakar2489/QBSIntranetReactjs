import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { compareAsc, format } from 'date-fns'
const token = JSON.parse(localStorage.getItem('key'));
let SERVER_URL = process.env.REACT_APP_BASE_URL;
function AddBulletinComp() {
	let navigate = useNavigate()
	const [comdata, setComdata] = useState([]);
	const [comp, setComp] = useState('');
	const [bulletin, setBulletin] = useState();
	const [detail, setDetail] = useState();
	const [status, setStatus] = useState(1);
	const [image, setImage] = useState('')
	const [scsMsg, setScsMsg] = useState();
	const [color, setColor] = useState();

	const date = new Date();
	const date_formate = format(date, 'yyyy-MM-dd HH:m:SS')
	const userId = localStorage.getItem('userId');

	useEffect(() => {
		getCompanyList()
	}, []);

	const getCompanyList = () => {
		const response = fetch(SERVER_URL + `api/company_list`,
			{
				method: 'GET',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
					'authorization': `bearer ${token.value}`
				},

			}).then(res => res.json())
			.then(data => {
				setComdata(data.result)
			});
	}
	const handleOnsubmit = (e) => {
		e.preventDefault()
		const formdata = new FormData();
		formdata.append('attachment', image);
		formdata.append('compId', comp);
		formdata.append('title', bulletin);
		formdata.append('message', detail);
		formdata.append('created_on', date_formate);
		formdata.append('created_by', userId);
		formdata.append('status', status);
		const response = fetch(SERVER_URL + `api/add_bulletin`,
			{
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'authorization': `bearer ${token.value}`
				},
				body: formdata,
			}).then(res => res.json())
			.then(data => {
				if (data.status == true) {
					setScsMsg(data.msg);
					setColor('green')
					setTimeout(() => {
						return navigate("/bulletinlist")
					}, 2000);
				} else {
					setScsMsg(data.msg);
					setColor('red');
				}
			})
	}
	const handlefile = async (e) => {
		const file = e.target.files[0]
		const reader = new FileReader();
		reader.onloadend = () => {
			setImage(reader.result.toString());
		}
		reader.readAsDataURL(file);
	}
	return (
		<form onSubmit={handleOnsubmit} >
			<div className="row-bg">
				<h3 className="mt05">Add New Bulletin</h3>
				<div className="form_style_1">
					<div className="row mb30">
						<div className="col-md-4">
							<div className="form-blk">
								<div className="form-label">Company</div>
								<div className="form-input">
									<select className="form-select" onChange={e => setComp(e.target.value)}>
										<option value="">Select</option>
										{
											comdata?.map(function (item, ind) {
												return <option key={ind} value={item.id} >{item.name}</option>;
											})
										}
									</select>
								</div>
							</div>
						</div>
						<div className="col-md-4">
							<div className="form-blk">
								<div className="form-label">Bulletin Name</div>
								<div className="form-input">
									<input type="text" onChange={e => setBulletin(e.target.value)} placeholder="" className="form-control" />
								</div>
							</div>
						</div>
						<div className="col-md-4">
							<div className="form-blk">
								<div className="form-label">Attachments</div>
								<div className="form-input">
									<input type="file" name="file" onChange={handlefile} id="file" className="file" />
									<div className="d-flex">
										<input type="text" placeholder="No Files Chosen" name="file-name" id="file-name" className="file-name" readOnly />
										<input type="button" className="upload_btn" value="Choose File" />
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="row mb30">
						<div className="col-md-8">
							<div className="form-blk">
								<div className="form-label">Form Details</div>
								<div className="form-input">
									<textarea className="form-control" cols="" rows="4" onChange={e => setDetail(e.target.value)}></textarea>
								</div>
							</div>
						</div>
						<div className="col-md-4">
							<div className="form-blk">
								<div className="form-label">Is Active</div>
								Active:
								<input type="radio" name="radiobtn" value="0" checked onChange={e => setStatus(e.target.value)} />

								Inactive:
								<input type="radio" name="radiobtn" value="1" onChange={e => setStatus(e.target.value)} />
							</div>
						</div>
					</div>

					<div className="row mt-5">
						<span style={{ color: color }}>{scsMsg}</span>
						<div className="col-md-12">
							<a href="bulletin.html" className="btn_style_bor_1 mr07">Cancel</a>
							<button className="btn_style2 mr07">Save & New</button>
							<button className="btn_style2">Save & Exit</button>
						</div>
					</div>
				</div>

			</div>
		</form>
	)
}

export default AddBulletinComp
