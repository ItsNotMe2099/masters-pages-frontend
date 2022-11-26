import {IFormStep} from 'types/types'
import React, {useEffect, useMemo, useState} from 'react'
import RegistrationLayout from "components/for_pages/Registration/RegistrationLayout";
import {useRouter} from "next/router";
import FormStepSwitch from "components/ui/FormStepSwitch";
import CorporateRegEmailStep from "./UserRegPhoneStep";
import CorporateRegContactsStep from "components/for_pages/CorporateRegistration/CorporateRegContactsStep";
import CorporateRegOrganizationStep from "components/for_pages/CorporateRegistration/CorporateRegOrganizationStep";
import CorporateRegFinishStep from "components/for_pages/CorporateRegistration/CorporateRegFinishStep";
import {useAppContext} from "context/state";
import OrganizationRepository from "data/repositories/OrganizationRepository";
import {OrganizationStatus} from "data/intefaces/IOrganization";
import Loader from "components/ui/Loader";
import UserRegPhoneStep from "./UserRegPhoneStep";
import UserRegInfoStep from "components/for_pages/UserRegistration/UserRegInfoStep";
import UserRegProfileRoleStep from "components/for_pages/UserRegistration/UserRegProfileRoleStep";
import UserRegProfileDetailsStep from "components/for_pages/UserRegistration/UserRegProfileDetailsStep";


enum FormStep {
  Login = 'category',
  Info = 'Info',
  Role = 'role',
  RoleDetails = 'RoleDetails'
}

const steps: IFormStep<FormStep>[] = [
  {
    name: 'Категория',
    description: null,
    key: FormStep.Login
  },
  {
    name: 'Описание',
    description: null,
    key: FormStep.Info
  },
  {
    name: 'Условия',
    description: null,
    key: FormStep.Role
  },
  {
    name: 'Расписание',
    description: null,
    key: FormStep.RoleDetails
  },

]

interface Props {
  stepKey?: string
}

export default function UserRegPage(props: Props) {
  const appContext = useAppContext()
  const router = useRouter()
  const [formData, setFormData] = useState<any>({});
  const [step, setStep] = useState<IFormStep<FormStep>>(appContext.isLogged ? steps[1] : steps[0]);
  const currentStepIndex = useMemo(() => steps.findIndex(i => i.key === step.key) ?? 0, [step, steps])
  console.log("Data", appContext.profile)
  const [loading, setLoading] = useState(appContext.isLogged ?  true : false)

  useEffect(() => {
   if(!appContext.user){
     return;
   }
    if(appContext.user.isRegistrationCompleted){
      setStep(steps[2])
    }
    setLoading(false);
  }, [appContext.user])

  useEffect(() => {
    if (props.stepKey) {
      setStep(steps.find(i => i.key === props.stepKey) ?? steps[0])
    }
  }, [props.stepKey])
  useEffect(() => {
    const step = steps.find(i => i.key === router.query.step as string as any)!
    if (step) {
      setStep(step)
    }
  }, [router.query.step])
  const setStepValue = async (stepKey: FormStep) => {
    const step = steps.find(i => i.key === stepKey)!
    setStep(step)
   /*await router.replace('/lk/owner/[profileRole]/listings/[id]/edit/[step]', Routes.lkOwnerListingEdit(profileRole, props.entityId, step.key as any), {
      shallow: true
    })*/
  }
  const handleNextStep = (formData?: any) => {
    if(formData){
      setFormData({...formData});
    }
    setStepValue(steps[currentStepIndex + 1].key)
  }

  const handleBack= (formData?: any) => {

    setStepValue(steps[currentStepIndex - 1].key)
  }

  return ( <RegistrationLayout>
    {loading ? <Loader/> : <FormStepSwitch index={currentStepIndex} options={[
        <UserRegPhoneStep key={1} onNextStep={handleNextStep} />,
        <UserRegInfoStep key={2} onNextStep={handleNextStep}  />,
        <UserRegProfileRoleStep key={3} onNextStep={handleNextStep} />,
        <UserRegProfileDetailsStep role={formData?.profileRole} key={4} onBack={handleBack} onNextStep={handleNextStep}/>
      ]} />}
  </RegistrationLayout>
  )
}
