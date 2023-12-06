function validate(val, name, that) {
	let str = ''
	if(name == 'name') {
		if(!val) {
			str = '请输入联系人姓名'
			that.flag = false
		}
	}
	if(name == 'sex') {
		if(!val) {
			str = '请选择性别'
			that.flag = false
		}
	}
	if(name == 'phone') {
		let phoneReg = /^1[3|4|5|6|7|8|9][0-9]{9}$/
		if(!val) {
			str = '请输入手机号'
			that.flag = false
		}
		else if(!phoneReg.test(val)) {
			str = '请输入正确的手机号'
			that.flag = false
		}
	}
	if(name == 'company') {
		if(!val) {
			str = '请输入企业名称'
			that.flag = false
		}
	}
	return str
}
$(function() {
	let width = document.body.clientWidth
	$('.fkui').on('click', () => {
		$('.businessConsult').show()
	})
	$('.customer').on('click', () => {
		$('.businessConsult').show()
	})
	$('.login').on('click', () => {
		window.open('https://e.qxjtguanjia.com/login')
	})
	$('.default').on('click', () => {
		$('.businessConsult').hide()
	})
	if(width<=768) {
		$("#man_mobile").prop("checked",1);
		$("#man").prop("checked",0);
	}
	else {
		$('#man').prop("checked",1);
		$("#man_mobile").prop("checked",0);
	}
	$('.normal').on('click', () => {
		let name = $('.name_input').val()
		let phone = $('.phone_input').val()
		let company = $('.company_input').val()
		let email = $('.email_input').val()
		let remark = $('.remark_input').val()
		let sexVal = ''
		this.flag = true
		$('.nameMsg').text(validate(name, 'name', this))
		if(width<=768) {
			let manMobile = $('#man_mobile:checked').val()
			let womanMobile = $('#woman_mobile:checked').val()
			if(manMobile) {
				sexVal = 'man'
			}
			else if(womanMobile) {
				sexVal = 'woman'
			}
			$('.sexMsg').text(validate(sexVal, 'sex', this))
		}
		else {
			let man = $('#man:checked').val()
			let woman = $('#woman:checked').val()
			if(man) {
				sexVal = 'man'
			}
			else if(woman) {
				sexVal = 'woman'
			}
			if(!$('.nameMsg').text()) {
				$('.nameMsg').text(validate(sexVal, 'sex', this))
			}
		}
		$('.phoneMsg').text(validate(phone, 'phone', this))
		$('.companyMsg').text(validate(company, 'company', this))
		if(this.flag) {
			let data = {
				contactPerson: name,
				enterpriseName: company,
				gender: sexVal === 'man'?0:1,
				leaveComments: remark,
				phone: phone,
				mailbox: email
			}
			$.ajax({
				type: "post",
//				url: "https://test.qxguanjia.com/api/platform/enterpriseAdvisory/save",
				url: "https://e.qxguanjia.com/api/platform/enterpriseAdvisory/save",
				headers: { 
                    'Content-Type': 'application/json'  //multipart/form-data;boundary=--xxxxxxx   application/json
               	},
               	cache: false,
               	dataType: 'json',
				data: JSON.stringify(data),
				success: (res) => {
					$('.businessConsult').hide()
					if(res.code == 200) {
						$('.dialog').show()
						$('.dialog').text('提交成功，我们会尽快与您联系')
						setTimeout(() => {
							$('.dialog').addClass('active')
						})
						setTimeout(() => {
							$('.dialog').hide()
							$('.dialog').removeClass('active')
						}, 3000)
					}
					else {
						$('.dialog').show()
						$('.dialog').text('提交失败')
						setTimeout(() => {
							$('.dialog').addClass('active')
						})
						setTimeout(() => {
							$('.dialog').hide()
							$('.dialog').removeClass('active')
						}, 3000)
					}
				},
				error: function(){
					$('.dialog').show()
					$('.dialog').text('提交失败')
					setTimeout(() => {
						$('.dialog').addClass('active')
					})
					setTimeout(() => {
						$('.dialog').hide()
						$('.dialog').removeClass('active')
					}, 3000)
		      	},
			});
		}
	})
})