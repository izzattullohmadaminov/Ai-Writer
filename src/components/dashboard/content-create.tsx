import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '../ui/textarea'
import { Button } from '../ui/button'
import { FormEvent, useState } from 'react'
import { Loader2 } from 'lucide-react'
import { GenerateArticle } from '@/utills/openai'

export default function ContentCreate() {
    const [isLoading, setIsLoading] = useState(false)
    const [form, setForm] = useState({
        title: '',
        description: '',
    })
    const [content, setContent] = useState<string | null>()
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        const result = await GenerateArticle(form.title, form.description)
        setContent(result)
        setIsLoading(false)
    }
    const handelChange = (
        event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = event.currentTarget
        setForm({ ...form, [name]: value })
    }
    return (
        <div>
            <h1 className="text-2xl font-semibold ">Articl Writer</h1>
            {content && <p>{content}</p>}
            <form className="mt-5" onSubmit={handleSubmit}>
                <div className="grid w-full  mb-4 gap-1.5">
                    <Label htmlFor="title">Title</Label>
                    <Input
                        type="title"
                        id="title"
                        placeholder="Tiltle"
                        onChange={handelChange}
                        disabled={isLoading}
                    />
                </div>
                <div className="grid w-full mb-4 gap-1.5">
                    <Label htmlFor="discription">Description</Label>
                    <Textarea
                        placeholder="type your description here"
                        id="discription"
                        name="description"
                        onChange={handelChange}
                        disabled={isLoading}
                    />
                </div>
                <Button disabled={isLoading}>
                    {isLoading && (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Generate
                </Button>
            </form>
        </div>
    )
}
