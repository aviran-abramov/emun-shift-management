import {Button} from "@/components/ui/button";
import {CardContent, CardFooter} from "@/components/ui/card";
import {Field, FieldLabel} from "@/components/ui/field";
import {Input} from "@/components/ui/input";

export function CreateBuildingForm() {
    return (
        <form className="flex flex-col gap-4">
            <CardContent className="flex flex-col">
                <Field>
                    <FieldLabel htmlFor="name" className="px-1">
                        שם הבניין
                    </FieldLabel>
                    <Input type="text" id="name" />
                </Field>

                <Field>
                    <FieldLabel htmlFor="street" className="px-1">
                        רחוב
                    </FieldLabel>
                    <Input type="text" id="street" />
                </Field>

                <Field>
                    <FieldLabel htmlFor="city" className="px-1">
                        עיר
                    </FieldLabel>
                    <Input type="text" id="city" />
                </Field>
            </CardContent>

            <CardFooter className="flex flex-col items-center gap-2">
                <Button type="submit" className="self-stretch">
                    הוסף
                </Button>
                <Button
                    type="reset"
                    variant={"outline"}
                    className="self-stretch border-primary"
                >
                    איפוס טופס
                </Button>
            </CardFooter>
        </form>
    );
}
